# Solutions - Java Basics

## Solution Strategy
- Define clear boundaries (controller/service/repository or equivalent layers).
- Validate input early and return stable error contracts.
- Keep core logic deterministic and testable.

## Reference Implementation
```java
public class FeatureService {
  public Result handle(Command cmd) {
    validate(cmd);
    // business rules
    return Result.success();
  }

  private void validate(Command cmd) {
    if (cmd == null) throw new IllegalArgumentException("INVALID_COMMAND");
  }
}
```

## Validation and Error Mapping
- Validation errors: map to `400` (or equivalent client error in non-HTTP contexts).
- Missing resource errors: map to `404` where applicable.
- Unexpected failures: map to `500` and log with correlation metadata.

## Production Notes
- Add structured logs (`requestId`, `operation`, `durationMs`, `status`).
- Keep external configuration outside source code.
- Add integration tests around framework boundaries.

## Test Cases You Should Include
1. Valid input returns expected output.
2. Invalid input returns deterministic error.
3. Dependency failure path is handled without contract break.
4. Boundary case (empty input, duplicate value, or timeout) behaves predictably.

## Refactor Checklist
- Remove duplicated validation logic.
- Rename ambiguous methods.
- Isolate side effects to boundary layers.
- Confirm tests still pass after refactor.
