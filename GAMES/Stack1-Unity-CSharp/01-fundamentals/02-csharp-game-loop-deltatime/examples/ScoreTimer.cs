using UnityEngine;

// Increments score over time only during active play.
public class ScoreTimer : MonoBehaviour
{
    [SerializeField] private GameStateController stateController;
    [SerializeField] private float pointsPerSecond = 1f;

    public float Score { get; private set; }

    private void Update()
    {
        if (stateController == null) return;
        if (stateController.CurrentState != GameStateController.GameState.Playing) return;

        // DeltaTime keeps scoring fair on all frame rates.
        Score += pointsPerSecond * Time.deltaTime;
    }

    public void ResetScore()
    {
        Score = 0f;
    }
}
