from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Any

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


PROMPT_TEMPLATE_VERSION = "v1-grounded-json"


def load_knowledge_base(path: str) -> list[dict[str, Any]]:
    kb_path = Path(path)
    if not kb_path.exists():
        raise ValueError(f"Knowledge base file not found: {kb_path}")

    docs = json.loads(kb_path.read_text(encoding="utf-8"))
    if not isinstance(docs, list) or not docs:
        raise ValueError("Knowledge base must be a non-empty JSON list")

    for idx, doc in enumerate(docs):
        if "id" not in doc or "text" not in doc:
            raise ValueError(f"Document at index {idx} must contain 'id' and 'text'")
    return docs


def chunk_text(text: str, chunk_size: int, overlap: int) -> list[str]:
    if not text.strip():
        return []
    if chunk_size <= 0:
        raise ValueError("chunk_size must be > 0")
    if overlap < 0:
        raise ValueError("overlap must be >= 0")
    if overlap >= chunk_size:
        raise ValueError("overlap must be smaller than chunk_size")

    words = text.split()
    chunks: list[str] = []
    step = chunk_size - overlap

    for start in range(0, len(words), step):
        piece = words[start : start + chunk_size]
        if not piece:
            break
        chunks.append(" ".join(piece))

    return chunks


def build_retriever(chunks: list[str]):
    if not chunks:
        raise ValueError("chunks must not be empty")

    vectorizer = TfidfVectorizer()
    matrix = vectorizer.fit_transform(chunks)

    def retrieve(query: str, top_k: int = 3) -> list[dict[str, Any]]:
        if not query.strip():
            raise ValueError("question must not be empty")
        if top_k <= 0:
            raise ValueError("top_k must be > 0")

        q_vec = vectorizer.transform([query])
        scores = cosine_similarity(q_vec, matrix).flatten()

        ranked_idx = scores.argsort()[::-1][:top_k]
        results = [
            {
                "chunk": chunks[i],
                "score": float(scores[i]),
            }
            for i in ranked_idx
            if float(scores[i]) > 0.0
        ]
        return results

    return retrieve


def answer_question(question: str, retriever, top_k: int = 3) -> dict[str, Any]:
    start = time.perf_counter()
    results = retriever(question, top_k=top_k)
    latency_ms = (time.perf_counter() - start) * 1000

    if not results:
        return {
            "answer": "insufficient context",
            "evidence": [],
            "confidence": 0.0,
            "prompt_template_version": PROMPT_TEMPLATE_VERSION,
            "latency_ms": round(latency_ms, 2),
        }

    evidence = [item["chunk"] for item in results]
    confidence = max(item["score"] for item in results)

    return {
        "answer": evidence[0],
        "evidence": evidence,
        "confidence": round(float(confidence), 4),
        "prompt_template_version": PROMPT_TEMPLATE_VERSION,
        "latency_ms": round(latency_ms, 2),
    }


def evaluate_batch(
    qa_pairs: list[dict[str, str]],
    retriever,
    top_k: int = 3,
) -> dict[str, Any]:
    if not qa_pairs:
        raise ValueError("qa_pairs cannot be empty")

    total = len(qa_pairs)
    grounded_pass = 0
    items = []

    for pair in qa_pairs:
        question = pair["question"]
        expected_keyword = pair["expected_keyword"].lower()

        response = answer_question(question, retriever, top_k=top_k)
        evidence_text = " ".join(response["evidence"]).lower()
        passed = expected_keyword in evidence_text

        if passed:
            grounded_pass += 1

        items.append(
            {
                "question": question,
                "grounded_pass": passed,
                "confidence": response["confidence"],
            }
        )

    return {
        "total": total,
        "grounded_pass": grounded_pass,
        "grounded_rate": round(grounded_pass / total, 4),
        "items": items,
    }
