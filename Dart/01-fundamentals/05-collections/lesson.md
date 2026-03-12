# Collections and Data Processing in Dart

## Module Info
- Level: Beginner
- Duration: 90 minutes
- Prerequisites: Functions

## Learning Outcomes
- Use lists, sets, and maps for the right job.
- Iterate and transform data safely.
- Detect duplicates, missing values, and grouped results.

## Deep Dive
### Lists
- Use lists for ordered collections where duplicates may matter.

### Sets
- Use sets to enforce uniqueness or support fast membership checks.

### Maps
- Use maps for keyed lookup and structured record-like data.

## Worked Example
```dart
final products = [
  {'name': 'Mouse', 'price': 25.0},
  {'name': 'Keyboard', 'price': 60.0},
];

final total = products.fold<double>(
  0,
  (sum, item) => sum + (item['price'] as double),
);
```

## Common Pitfalls
- Using the wrong collection type and fighting it later.
- Mutating a list while iterating over it.
- Storing inconsistent map shapes.

## Debugging Checklist
- Print collection sizes and intermediate values.
- Validate keys before reading from maps.
- Confirm uniqueness assumptions before choosing a set.

## Step-by-Step Practice Plan
1. Build a list of items.
2. Group or summarize with map-based counters.
3. Remove duplicates with a set where appropriate.

## Mini Project Task
Summarize transaction data by category and total amount.

## Interview Q&A
- Q: When is a map a poor substitute for a class?
- A: When the data shape is stable and deserves typed structure.

## Exit Criteria
- You can choose and justify the correct collection type for a small feature.
