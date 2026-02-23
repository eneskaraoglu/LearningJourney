# 02 Exercises MLOps FastAPI Docker MLflow DVC

## Part A
- Implement `train.py` to train a simple classifier and save `models/model.joblib`.
- Log params and metrics to MLflow.
- Ensure script exits with clear errors if dataset is missing.

## Part B
- Implement `api.py` with `/health` and `/predict` endpoints.
- Validate request body with Pydantic.
- Return consistent error messages for invalid input shape.

## Part C
- Add Dockerfile and verify containerized API startup.
- Add DVC stage for training and output model artifact.
- Document reproducible run steps in `sample/README.md`.

## Constraints
- Use deterministic random seed.
- Keep inference contract stable.
- Avoid hidden global mutable state in API code.

## Acceptance Criteria
- `python src/train.py` produces model artifact.
- `uvicorn src.api:app --reload` serves API locally.
- Docker image builds and runs.
- `dvc repro` can rebuild model stage.

## Bonus Challenge
- Add a `/metadata` endpoint returning model version and training timestamp.

## Reflection Prompts
- Which failure mode is hardest to detect without logging?
- How would you roll back to a previous model safely?
