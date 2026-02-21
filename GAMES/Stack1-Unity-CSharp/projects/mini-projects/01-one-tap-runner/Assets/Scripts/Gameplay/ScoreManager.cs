using UnityEngine;

// Tracks score during run and stores best score locally.
public class ScoreManager : MonoBehaviour
{
    private const string BestScoreKey = "one_tap_runner_best_score";

    [SerializeField] private float scorePerSecond = 1f;

    public float CurrentScore { get; private set; }
    public int BestScore { get; private set; }

    private void Awake()
    {
        BestScore = PlayerPrefs.GetInt(BestScoreKey, 0);
    }

    private void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        CurrentScore += scorePerSecond * Time.deltaTime;
    }

    public void SaveBestIfNeeded()
    {
        int rounded = Mathf.FloorToInt(CurrentScore);
        if (rounded <= BestScore)
        {
            return;
        }

        BestScore = rounded;
        PlayerPrefs.SetInt(BestScoreKey, BestScore);
        PlayerPrefs.Save();
    }
}
