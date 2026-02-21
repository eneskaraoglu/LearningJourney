using UnityEngine;

// Spawns obstacles at time intervals and reuses pooled objects.
public class ObstacleSpawner : MonoBehaviour
{
    [SerializeField] private ObjectPool obstaclePool;
    [SerializeField] private float minSpawnDelay = 1.1f;
    [SerializeField] private float maxSpawnDelay = 2.0f;

    private float spawnTimer;

    private void Start()
    {
        ResetSpawnTimer();
    }

    private void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        spawnTimer -= Time.deltaTime;
        if (spawnTimer > 0f) return;

        SpawnObstacle();
        ResetSpawnTimer();
    }

    private void SpawnObstacle()
    {
        GameObject obstacle = obstaclePool.Get();
        obstacle.transform.position = transform.position;
        obstacle.SetActive(true);
    }

    private void ResetSpawnTimer()
    {
        spawnTimer = Random.Range(minSpawnDelay, maxSpawnDelay);
    }
}
