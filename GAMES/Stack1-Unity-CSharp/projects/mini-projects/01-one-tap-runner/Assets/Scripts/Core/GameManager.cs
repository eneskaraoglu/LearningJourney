using UnityEngine;
using UnityEngine.SceneManagement;

// Owns the high-level game loop for the one-tap runner.
public class GameManager : MonoBehaviour
{
    public enum GameState
    {
        Start,
        Playing,
        GameOver
    }

    [SerializeField] private int targetFps = 60;

    public GameState CurrentState { get; private set; } = GameState.Start;

    public static GameManager Instance { get; private set; }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;

        // Stable frame target improves consistency on mobile.
        Application.targetFrameRate = targetFps;
    }

    public void BeginRun()
    {
        if (CurrentState != GameState.Start)
        {
            return;
        }

        CurrentState = GameState.Playing;
    }

    public void TriggerGameOver()
    {
        if (CurrentState != GameState.Playing)
        {
            return;
        }

        CurrentState = GameState.GameOver;
        Time.timeScale = 0f;
    }

    public void Restart()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
}
