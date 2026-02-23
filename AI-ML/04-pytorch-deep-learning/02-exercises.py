"""
02 Exercises: PyTorch Deep Learning

Part A (Core Implementation)
- Implement a `TabularDataset` class.
- Implement `build_model(input_dim)`.
- Implement `train_one_epoch(model, loader, optimizer, criterion)`.

Part B (Validation/Error Cases)
- Implement `evaluate(model, loader, criterion)` with `torch.no_grad()`.
- Validate feature/label tensor shapes and dtypes.
- Raise clear error for empty DataLoader.

Part C (Reliability/Refactor)
- Implement `fit(model, train_loader, val_loader, epochs)`.
- Save best checkpoint based on validation loss.
- Return training history dictionary.

Constraints
- Keep train/eval logic separated.
- Do not duplicate model-forward logic.
- Use deterministic seed setup.

Acceptance Criteria
- Model trains for at least 3 epochs without runtime errors.
- History contains train and validation loss per epoch.
- Checkpoint file is produced.

Bonus Challenge
- Add class weighting for imbalanced labels.

Reflection Prompts
- Which metric changed after class weighting?
- What failed first when shape assumptions were wrong?
"""

from __future__ import annotations

import torch
import torch.nn as nn


def build_model(input_dim: int) -> nn.Module:
    # TODO
    raise NotImplementedError


def train_one_epoch(model, loader, optimizer, criterion, device: str = "cpu") -> float:
    # TODO
    raise NotImplementedError


def evaluate(model, loader, criterion, device: str = "cpu") -> float:
    # TODO
    raise NotImplementedError
