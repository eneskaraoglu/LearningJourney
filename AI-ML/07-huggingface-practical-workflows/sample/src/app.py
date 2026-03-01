from __future__ import annotations

from config import load_settings
from hf_workflow import (
    compute_metrics,
    create_pipeline,
    inspect_token_lengths,
    load_records,
    login_if_token_present,
    run_predictions,
)


def main() -> None:
    settings = load_settings()
    login_if_token_present(settings.hf_token)

    classifier = create_pipeline(settings)
    records = load_records(settings)
    predictions = run_predictions(
        classifier=classifier,
        records=records,
        threshold=settings.confidence_threshold,
    )
    metrics = compute_metrics(predictions)
    token_stats = inspect_token_lengths(
        settings=settings,
        texts=[row["text"] for row in records],
    )

    demo_preview = predictions[:5]
    print("Model:", settings.model_id)
    print("Dataset:", settings.dataset_name, settings.dataset_split, settings.dataset_limit)
    print("Token stats:", token_stats)
    print("Metrics:", metrics)
    print("Preview:")
    for row in demo_preview:
        print(
            {
                "label": row["label"],
                "score": row["score"],
                "low_confidence": row["low_confidence"],
                "text": row["text"][:80],
            }
        )


if __name__ == "__main__":
    main()
