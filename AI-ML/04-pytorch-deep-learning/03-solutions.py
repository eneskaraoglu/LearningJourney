from __future__ import annotations

from pathlib import Path

import torch
import torch.nn as nn


def build_model(input_dim: int) -> nn.Module:
    if input_dim <= 0:
        raise ValueError("input_dim must be > 0")
    return nn.Sequential(
        nn.Linear(input_dim, 32),
        nn.ReLU(),
        nn.Dropout(0.2),
        nn.Linear(32, 2),
    )


def train_one_epoch(model, loader, optimizer, criterion, device: str = "cpu") -> float:
    if len(loader) == 0:
        raise ValueError("train loader is empty")

    model.train()
    total_loss = 0.0

    for features, labels in loader:
        features = features.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()
        logits = model(features)
        loss = criterion(logits, labels)
        loss.backward()
        optimizer.step()

        total_loss += float(loss.item())

    return total_loss / len(loader)


def evaluate(model, loader, criterion, device: str = "cpu") -> float:
    if len(loader) == 0:
        raise ValueError("validation loader is empty")

    model.eval()
    total_loss = 0.0

    with torch.no_grad():
        for features, labels in loader:
            features = features.to(device)
            labels = labels.to(device)

            logits = model(features)
            loss = criterion(logits, labels)
            total_loss += float(loss.item())

    return total_loss / len(loader)


def fit(model, train_loader, val_loader, epochs: int = 5, lr: float = 1e-3, device: str = "cpu") -> dict:
    if epochs <= 0:
        raise ValueError("epochs must be > 0")

    model.to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)

    history = {"train_loss": [], "val_loss": []}
    best_val = float("inf")
    checkpoint = Path("best_model.pt")

    for _ in range(epochs):
        train_loss = train_one_epoch(model, train_loader, optimizer, criterion, device=device)
        val_loss = evaluate(model, val_loader, criterion, device=device)

        history["train_loss"].append(train_loss)
        history["val_loss"].append(val_loss)

        if val_loss < best_val:
            best_val = val_loss
            torch.save(model.state_dict(), checkpoint)

    return history
