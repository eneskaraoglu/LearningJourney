using UnityEngine;

// Central state owner for a simple runner loop.
public class GameStateController : MonoBehaviour
{
    public enum GameState
    {
        Start,
        Playing,
        GameOver
    }

    public GameState CurrentState { get; private set; } = GameState.Start;

    public void StartGame()
    {
        if (CurrentState != GameState.Start)
        {
            Debug.LogWarning("StartGame ignored because state is not Start.");
            return;
        }

        CurrentState = GameState.Playing;
    }

    public void EndGame()
    {
        if (CurrentState != GameState.Playing)
        {
            Debug.LogWarning("EndGame ignored because state is not Playing.");
            return;
        }

        CurrentState = GameState.GameOver;
    }

    public void ResetGame()
    {
        CurrentState = GameState.Start;
    }
}
