# 01 LLM Engineering Foundations Lesson

## Module Info
- Level: Intermediate
- Duration: 12-18 hours
- Prerequisites: Python, APIs, basic ML concepts, JSON handling

## Learning Outcomes
By the end of this module, you will be able to:
- explain core LLM engineering components (tokenization, prompting, retrieval, evaluation),
- build a local retrieval-first assistant pipeline,
- design stable prompt templates and output contracts,
- evaluate response quality with practical checks for groundedness and safety.

## Deep Dive

### 1. LLM engineering vs model training
Most production teams do not train foundation models from scratch. They orchestrate prompts, context retrieval, guardrails, and evaluation around existing models.

### 2. Tokenization and context budget
Token limits are hard constraints. If context is oversized, important details are dropped. You need chunking, ranking, and compact prompt design to preserve critical evidence.

### 3. Embeddings and retrieval
Embeddings map text to vectors so semantically similar documents are near each other. Retrieval-augmented generation (RAG) reduces hallucination by forcing answers to use selected source chunks.

### 4. Prompt contracts
Prompts should specify:
- role and task,
- strict output format,
- grounding policy (answer only from context),
- fallback behavior when evidence is missing.

### 5. Evaluation loops
Useful evaluation dimensions:
- relevance: did answer address the question?
- groundedness: are claims backed by retrieved text?
- completeness: are key points missing?
- safety: does response avoid unsupported or risky advice?

## Worked Example
```python
def build_prompt(question: str, context_chunks: list[str]) -> str:
    context = "\n\n".join(context_chunks)
    return (
        "You are a grounded assistant. "
        "Answer only using context. "
        "If not found, say 'insufficient context'.\n\n"
        f"Context:\n{context}\n\n"
        f"Question: {question}\n"
        "Output JSON: {\"answer\": string, \"confidence\": number}"
    )
```

## Common Pitfalls
- Sending entire raw documents without chunking.
- Not validating whether final answer cites retrieved evidence.
- Prompt drift between environments due to undocumented template changes.
- Evaluating only fluency instead of factual grounding.

## Debugging Checklist
- Confirm chunk sizes and overlap settings.
- Verify retrieval top-k contains relevant chunks.
- Check prompt template version in logs.
- Inspect failure cases where answer is fluent but unsupported.
- Track response latency per pipeline step.

## Step-by-Step Practice Plan
1. Build a local knowledge base from small markdown/json docs.
2. Implement chunking and simple vector retrieval.
3. Design a grounded prompt template.
4. Add answer validator for missing evidence.
5. Add offline evaluation script on 10-20 QA pairs.

## Mini Project Task
Build a `policy_assistant` that answers internal policy questions with:
- retrieval over local docs,
- strict JSON output contract,
- evidence snippet list,
- fallback when confidence is low.

## Interview Q&A
1. Why does RAG reduce hallucination risk?
2. What tradeoffs exist in chunk size and overlap?
3. How would you detect prompt regressions after a change?
4. What metrics matter most for enterprise LLM assistants?
5. Why is groundedness more important than style in critical workflows?

## Exit Criteria
- You can implement a retrieval-first QA pipeline locally.
- You can explain and enforce prompt/output contracts.
- You can evaluate groundedness and failure patterns systematically.
- You can document limitations and safe fallback behavior.
