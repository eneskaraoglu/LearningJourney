# C# Game Loop and deltaTime

## Module Info
- Level: Intermediate programmer
- Duration: 90 min
- Prerequisites: Lesson 01 complete

## Learning Outcomes
- Distinguish responsibilities of Update, FixedUpdate, and LateUpdate.
- Implement frame-rate-independent movement and timers using Time.deltaTime.
- Avoid common mobile bugs caused by frame-dependent logic.
- Build simple gameplay loop states: Start, Playing, GameOver.

## Deep Dive
### Frame-rate dependency problem
If movement uses a fixed value per frame (position += speed), high FPS devices move faster and low FPS devices move slower. This creates unfair gameplay and inconsistent difficulty.

### Correct deltaTime use
- Continuous movement/timers in Update should multiply by Time.deltaTime.
- Physics operations should prefer Rigidbody2D methods and FixedUpdate.
- Do not multiply by deltaTime twice.

### Minimal game loop state flow
Use an enum to protect logic branches:
- Start: waiting for first tap
- Playing: score increments and obstacles spawn
- GameOver: movement stops, UI prompts retry

### Mobile-specific timing concerns
- Spikes can happen due to GC, background tasks, thermal throttling.
- Cap extreme frame jumps with Mathf.Min(Time.deltaTime, maxStep) for sensitive systems.

## Worked Example
RunnerMover.cs uses deltaTime and supports pause via game state.

`csharp
using UnityEngine;

public class RunnerMover : MonoBehaviour
{
    [SerializeField] private float speed = 4f;

    public bool CanMove { get; set; } = true;

    private void Update()
    {
        if (!CanMove) return;

        float dt = Mathf.Min(Time.deltaTime, 0.05f);
        transform.Translate(Vector3.right * speed * dt);
    }
}
`

## Common Pitfalls
- Applying input in FixedUpdate without buffering.
- Driving Rigidbody2D position directly in Update.
- Running score timer while game is over.
- Forgetting to pause time-sensitive systems on app pause.

## Debugging Checklist
- Verify movement speed at both 30 FPS and 60 FPS.
- Log current state transitions and ensure no invalid transition occurs.
- Check timer behavior after pause/resume.
- Confirm game-over truly stops progression systems.

## Step-by-Step Practice Plan
1. Implement GameStateController enum-based flow.
2. Add RunnerMover using clamped deltaTime.
3. Add ScoreTimer that increments only in Playing.
4. Trigger GameOver on collision and ensure movement/timer stop.
5. Test at different frame-rate targets.

## Mini Project Task
Apply this architecture to One-Tap Runner and record a 30-second gameplay test proving consistent movement across frame-rate changes.

## Interview Q&A
- Q: Why clamp deltaTime in some systems?
  A: To prevent huge frame spikes from producing unrealistic jumps.
- Q: When should you use FixedUpdate?
  A: For physics-integrated logic that depends on Rigidbody updates.
- Q: How does state gating reduce bugs?
  A: It centralizes allowed behavior and prevents accidental updates in wrong phases.

## Exit Criteria
- Movement is frame-rate independent.
- Score and movement stop on game over.
- State transitions are explicit and valid.
- Tested at multiple frame-rate targets without logic drift.
