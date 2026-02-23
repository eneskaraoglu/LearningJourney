"""
02 Exercises: LLM Engineering Foundations

Part A (Core Implementation)
- Implement `load_knowledge_base(path)` for JSON docs.
- Implement `chunk_text(text, chunk_size, overlap)`.
- Implement `build_retriever(chunks)` using TF-IDF vectors.

Part B (Validation/Error Cases)
- Reject empty question input.
- Reject invalid chunk parameters (`overlap >= chunk_size`).
- Handle no-retrieval cases with deterministic fallback response.

Part C (Reliability/Advanced Flow)
- Implement `answer_question(question, retriever, top_k)` returning:
  {
    "answer": str,
    "evidence": list[str],
    "confidence": float
  }
- Implement `evaluate_batch(qa_pairs)` with groundedness pass/fail.
- Track simple latency measurements per question.

Constraints
- Keep retrieval deterministic for same inputs.
- Separate retrieval logic from response formatting.
- Use explicit response contract keys.

Acceptance Criteria
- Pipeline runs with local sample knowledge base.
- Invalid input paths and empty questions return clear errors.
- Response includes evidence and confidence fields.

Bonus Challenge
- Add a lightweight prompt-template version tag and include it in output.

Reflection Prompts
- Which questions fail due to retrieval quality vs answer formatting?
- How would you reduce false confidence in unsupported answers?
"""

from __future__ import annotations

from typing import Any


def load_knowledge_base(path: str) -> list[dict[str, Any]]:
    # TODO
    raise NotImplementedError


def chunk_text(text: str, chunk_size: int, overlap: int) -> list[str]:
    # TODO
    raise NotImplementedError


def build_retriever(chunks: list[str]):
    # TODO
    raise NotImplementedError


def answer_question(question: str, retriever, top_k: int = 3) -> dict[str, Any]:
    # TODO
    raise NotImplementedError
