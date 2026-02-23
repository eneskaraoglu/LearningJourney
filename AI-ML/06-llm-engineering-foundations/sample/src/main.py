from __future__ import annotations

import json
import time
from pathlib import Path

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def chunk_text(text: str, chunk_size: int = 40, overlap: int = 8) -> list[str]:
    words = text.split()
    step = chunk_size - overlap
    chunks = []

    for start in range(0, len(words), step):
        part = words[start : start + chunk_size]
        if not part:
            break
        chunks.append(" ".join(part))
    return chunks


def build_retriever(chunks: list[str]):
    vectorizer = TfidfVectorizer()
    matrix = vectorizer.fit_transform(chunks)

    def retrieve(query: str, top_k: int = 2):
        q = vectorizer.transform([query])
        scores = cosine_similarity(q, matrix).flatten()
        idx = scores.argsort()[::-1][:top_k]
        return [{"chunk": chunks[i], "score": float(scores[i])} for i in idx if scores[i] > 0]

    return retrieve


def answer_question(question: str, retriever) -> dict:
    start = time.perf_counter()
    results = retriever(question)
    latency_ms = round((time.perf_counter() - start) * 1000, 2)

    if not results:
        return {
            "answer": "insufficient context",
            "evidence": [],
            "confidence": 0.0,
            "latency_ms": latency_ms,
        }

    return {
        "answer": results[0]["chunk"],
        "evidence": [r["chunk"] for r in results],
        "confidence": round(results[0]["score"], 4),
        "latency_ms": latency_ms,
    }


def main() -> None:
    base = Path(__file__).resolve().parents[1]
    kb_path = base / "data" / "knowledge_base.json"

    docs = json.loads(kb_path.read_text(encoding="utf-8"))
    all_chunks = []

    for doc in docs:
        all_chunks.extend(chunk_text(doc["text"]))

    retriever = build_retriever(all_chunks)

    questions = [
        "How many days can customers request a refund?",
        "What are support working hours?",
        "What is the minimum password length?",
    ]

    for q in questions:
        response = answer_question(q, retriever)
        print(f"Q: {q}")
        print(json.dumps(response, indent=2))
        print("-" * 60)


if __name__ == "__main__":
    main()
