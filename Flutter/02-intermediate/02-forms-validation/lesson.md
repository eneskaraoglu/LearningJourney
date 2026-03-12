# Flutter Forms and Validation

## Module Info
- Level: Intermediate
- Duration: 90 minutes
- Prerequisites: State management foundations

## Learning Outcomes
- Build controlled input flows with validation.
- Separate field rules from submit logic.
- Handle invalid, partial, and retry states gracefully.

## Deep Dive
### Form State
- Input state is business-relevant state, not just temporary UI noise.

### Validation Timing
- Decide whether validation runs on change, blur, or submit based on UX needs.

### Submission Flow
- Submission should handle loading, success, and failure explicitly.

## Worked Example
```dart
final emailController = TextEditingController();

String? validateEmail(String value) {
  return value.contains('@') ? null : 'Enter a valid email';
}
```

## Common Pitfalls
- Validating too late.
- Coupling all form logic to one giant widget.
- Ignoring disabled or loading submit states.

## Debugging Checklist
- Confirm controller lifecycle and disposal.
- Test invalid input, empty input, and corrected input.
- Check that submit is blocked when rules fail.

## Step-by-Step Practice Plan
1. Build a simple create form.
2. Add field-level validation.
3. Add submit loading and error feedback.

## Mini Project Task
Create a profile or task editor form with clear validation messages.

## Interview Q&A
- Q: Why separate validation logic from the submit handler?
- A: It keeps rules reusable and prevents tangled button logic.

## Exit Criteria
- You can build a form that stays reliable under invalid and repeated input.
