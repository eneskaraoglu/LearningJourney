# 03 Solutions MLOps FastAPI Docker MLflow DVC

Reference implementation is provided in `sample/` with:
- `src/train.py` for deterministic training + MLflow logging
- `src/api.py` for validated inference API
- `Dockerfile` for containerized serving
- `dvc.yaml` for pipeline reproducibility

## Production-minded choices
- Clear API request/response schema
- Explicit model load failure behavior
- Deterministic training seed
- Version-friendly artifact location (`models/model.joblib`)
- Health endpoint for readiness checks

## Middleware and service boundaries
- API layer handles validation and response contract.
- Inference helper handles model loading and prediction.
- Training script is isolated from serving script to avoid accidental coupling.

## Retry/timeout/logging hooks
- Add request timeout/retry at API gateway or client layer.
- Add structured logging middleware (`request_id`, latency, status).
- Add metrics export (Prometheus) in production deployment.

Use the `sample/README.md` commands to run all steps.
