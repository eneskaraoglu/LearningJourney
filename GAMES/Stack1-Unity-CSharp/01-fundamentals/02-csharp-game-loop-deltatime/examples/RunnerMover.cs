using UnityEngine;

// Moves runner at stable speed independent of frame rate.
public class RunnerMover : MonoBehaviour
{
    [SerializeField] private float speed = 4f;
    [SerializeField] private GameStateController stateController;

    private void Update()
    {
        if (stateController == null) return;
        if (stateController.CurrentState != GameStateController.GameState.Playing) return;

        // Clamp oversized frame jumps to avoid unfair movement spikes.
        float dt = Mathf.Min(Time.deltaTime, 0.05f);
        transform.Translate(Vector3.right * speed * dt);
    }
}
