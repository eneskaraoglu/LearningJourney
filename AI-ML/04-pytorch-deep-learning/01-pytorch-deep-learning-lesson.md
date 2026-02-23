# 01 PyTorch Deep Learning Lesson

## Module Info
- Level: Intermediate
- Duration: 12-16 hours
- Prerequisites: NumPy basics, scikit-learn modeling, gradient descent concept

## Learning Outcomes
- Build and train a neural network in PyTorch.
- Implement Dataset/DataLoader for reliable batching.
- Track training/validation metrics and avoid overfitting.
- Save and load model checkpoints safely.

## Deep Dive

### 1. Tensors, autograd, and computational graph
PyTorch tracks operations for backpropagation. Understanding this graph explains why `loss.backward()` works and where gradient bugs appear.

### 2. Dataset and DataLoader boundaries
Separate data loading from model logic. This improves reproducibility, testability, and migration to larger datasets.

### 3. Training loop architecture
A robust training loop has:
- model mode control (`train`/`eval`),
- optimizer steps with gradient reset,
- validation without gradient tracking,
- epoch-level metric logging.

### 4. Overfitting controls
Use validation curves, dropout, weight decay, and early stopping signals. Never trust training loss alone.

### 5. Inference contract
Inference should define input shape, normalization, output interpretation, and confidence threshold policy.

## Worked Example
```python
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(10, 32),
    nn.ReLU(),
    nn.Dropout(p=0.2),
    nn.Linear(32, 2),
)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
```

## Common Pitfalls
- Forgetting `model.eval()` during validation.
- Mixing CPU and GPU tensors in one operation.
- Not setting random seeds for reproducibility checks.
- Saving full model object instead of `state_dict`.

## Debugging Checklist
- Verify tensor shapes at each layer.
- Inspect gradient norms for vanishing/exploding behavior.
- Ensure labels are correct dtype for loss function.
- Confirm no data leakage between train/validation split.

## Step-by-Step Practice Plan
1. Implement a tiny feedforward classifier.
2. Add train/validation epoch loop.
3. Add dropout and compare validation stability.
4. Save best checkpoint by validation loss.
5. Write an inference function with class probabilities.

## Mini Project Task
Create a tabular fraud classifier with PyTorch:
- normalized numeric features,
- class-imbalance handling,
- checkpointing,
- per-epoch metrics table.

## Interview Q&A
1. Why does `torch.no_grad()` matter in validation?
2. How do you detect overfitting early?
3. When would you use weighted loss?
4. Why save `state_dict` instead of the full model object?

## Exit Criteria
- You can implement a complete PyTorch training and evaluation loop.
- You can debug shape, gradient, and mode-switch errors.
- You can export and reload a model checkpoint for inference.
