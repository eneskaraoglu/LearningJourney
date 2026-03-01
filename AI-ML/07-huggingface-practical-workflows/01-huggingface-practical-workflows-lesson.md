# 01 Hugging Face Practical Workflows Lesson

## Module Info
- Level: Intermediate
- Duration: 14-20 hours
- Prerequisites: Python basics, virtual environments, basic ML concepts, pandas/scikit-learn familiarity

## Learning Outcomes
By the end of this module, you will be able to:
- navigate key Hugging Face components (`transformers`, `datasets`, `tokenizers`, `huggingface_hub`),
- run reliable model inference pipelines with validation and fallback handling,
- prepare and tokenize datasets for fine-tuning,
- implement lightweight evaluation loops with stable metrics,
- package a local Hugging Face workflow that others can run and debug.

## Deep Dive

### 1. Hugging Face ecosystem mental model
Hugging Face is not a single library. It is an ecosystem:
- `transformers`: model architectures, tokenizers, pipelines, training utilities.
- `datasets`: dataset loading, slicing, preprocessing, caching.
- `tokenizers`: high-performance tokenization backend.
- `huggingface_hub`: pushing/pulling models and artifacts from the Hub.

In production, teams combine them in a pipeline:
1. load a model + tokenizer,
2. validate and preprocess input,
3. run inference or training,
4. evaluate outputs,
5. track versions and reproducibility.

### 2. Pipelines vs manual model calls
`pipeline(...)` is ideal when learning and for rapid prototyping:
- fewer moving parts,
- quick baseline result,
- consistent task interface (sentiment, zero-shot, NER, QA).

Manual model calls are better when you need:
- strict batching behavior,
- custom device strategy,
- lower-level tensor control,
- advanced post-processing.

Rule of thumb: start with pipelines for correctness, then optimize only after profiling shows a real bottleneck.

### 3. Model IDs, revisions, and reproducibility
A model reference like `distilbert-base-uncased-finetuned-sst-2-english` may change if you always pull `main`.
For repeatable results:
- pin `revision` (branch/tag/commit),
- record `transformers` version,
- log tokenizer + model identifiers at runtime,
- keep deterministic settings for evaluation runs.

Without this, learners compare outputs and assume their logic is wrong when the artifact version changed.

### 4. Data preparation before fine-tuning
Most fine-tuning failures come from data issues, not model architecture:
- missing labels,
- class imbalance,
- mismatched text field names,
- leakage between train/validation splits.

Practical preprocessing checklist:
1. validate required columns (`text`, `label`),
2. normalize whitespace and nulls,
3. map labels to deterministic integers,
4. tokenize with truncation/padding policy,
5. verify token length distributions.

### 5. Tokenization choices and performance
Tokenization controls memory, speed, and signal preservation.
Key parameters:
- `max_length`: upper bound; too small truncates information.
- `truncation=True`: required for long text safety.
- `padding`: dynamic for efficiency, fixed length for predictable shapes.

A common mistake is using a high `max_length` by default and hitting slow or memory-heavy training for little quality gain.

### 6. Evaluation that reflects real behavior
Accuracy alone hides failure modes. Add:
- precision/recall/F1 for class-specific behavior,
- confusion matrix to inspect systematic mistakes,
- latency metrics for inference endpoints,
- low-confidence analysis (where prediction score is weak).

For learning projects, build a small error table:
- input text,
- predicted label,
- confidence,
- expected label,
- short reason for likely error.

### 7. Operational concerns for local and team workflows
Even local projects need production-minded habits:
- explicit error messages for invalid inputs,
- retry behavior for temporary network/model download failures,
- environment-driven config (`HF_TOKEN`, model ID),
- clear README with exact commands.

This is how a toy script becomes maintainable learning infrastructure.

## Worked Example
```python
from transformers import pipeline


def classify_texts(texts: list[str]) -> list[dict]:
    if not texts or any(not t.strip() for t in texts):
        raise ValueError("texts must contain non-empty strings")

    clf = pipeline(
        task="sentiment-analysis",
        model="distilbert-base-uncased-finetuned-sst-2-english",
    )
    outputs = clf(texts, truncation=True)
    return [
        {
            "text": text,
            "label": item["label"],
            "score": float(item["score"]),
        }
        for text, item in zip(texts, outputs)
    ]
```

## Common Pitfalls
- Treating pipeline output as always the same shape without checking task docs.
- Ignoring truncation and silently losing important tail context.
- Evaluating on training data and overestimating model quality.
- Mixing label conventions (`POSITIVE`/`NEGATIVE` vs `1`/`0`) without a mapping layer.
- Forgetting to pin versions, then seeing inconsistent outputs across machines.

## Debugging Checklist
- Confirm model ID and revision in logs.
- Print first tokenized batch length stats before training.
- Verify dataset split sizes and label distribution.
- Inspect 10 misclassified samples manually.
- Validate that input cleaning happens before tokenization.
- Check dependency versions in `pip freeze` when results differ unexpectedly.

## Step-by-Step Practice Plan
1. Run local sentiment inference on 10 handcrafted sentences.
2. Add input validation and deterministic output contract.
3. Load a small text dataset slice with `datasets`.
4. Tokenize and inspect token length percentiles.
5. Implement simple evaluation metrics from predictions.
6. Refactor into reusable functions with clear boundaries.
7. Package a runnable `sample/` project with setup docs.

## Mini Project Task
Build a `review_quality_analyzer` tool:
- Input: list of product reviews.
- Output per review: label, confidence, and low-confidence flag.
- Include a dataset-loading utility for offline experimentation.
- Provide metrics summary and error table on a validation split.
- Add `HF_TOKEN` support for private/gated model access.

## Interview Q&A
1. When should you move from `pipeline` to manual model inference?
2. Why is model revision pinning important for ML reproducibility?
3. What are tradeoffs of dynamic vs fixed padding?
4. How do you detect label leakage in text classification datasets?
5. Why can high accuracy still be unacceptable in production?

## Exit Criteria
- You can build and run a Hugging Face inference workflow locally.
- You can validate, tokenize, and evaluate a text dataset slice.
- You can explain reproducibility and versioning decisions.
- You can structure code into maintainable modules with clear contracts.
