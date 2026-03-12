# Flutter Setup and Developer Workflow

## Module Info
- Level: Beginner
- Duration: 60 minutes
- Prerequisites: Basic Dart familiarity

## Learning Outcomes
- Install Flutter correctly and verify the toolchain.
- Understand emulator, device, and hot reload workflow.
- Diagnose common setup failures quickly.

## Deep Dive
### Toolchain Readiness
- Flutter setup is not finished until `flutter doctor` issues are resolved.

### Device Workflow
- Use an emulator for speed, but test on a physical device for real performance and input behavior.

### Fast Feedback
- Hot reload helps iteration, but know when a full restart is required.

## Worked Example
```bash
flutter doctor
flutter create starter_app
cd starter_app
flutter run
```

## Common Pitfalls
- Ignoring doctor warnings.
- Testing only on one emulator configuration.
- Confusing hot reload with a full app restart.

## Debugging Checklist
- Run `flutter doctor`.
- Verify device detection with `flutter devices`.
- Rebuild after dependency or native config changes.

## Step-by-Step Practice Plan
1. Install Flutter and fix doctor issues.
2. Run a starter app on emulator or device.
3. Change UI text and confirm hot reload behavior.

## Mini Project Task
Create and run a basic starter app, then document your local workflow commands.

## Interview Q&A
- Q: When is hot restart or full rebuild necessary?
- A: When state shape, initialization flow, or native dependencies change significantly.

## Exit Criteria
- You can set up a Flutter project and run it without guessing.
