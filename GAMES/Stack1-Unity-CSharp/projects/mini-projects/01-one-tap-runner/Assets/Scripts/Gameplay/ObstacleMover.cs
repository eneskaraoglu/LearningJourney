using UnityEngine;

// Moves obstacle left and returns it to pool when off-screen.
public class ObstacleMover : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 4f;
    [SerializeField] private float despawnX = -12f;

    private void Update()
    {
        if (GameManager.Instance == null) return;
        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        transform.Translate(Vector3.left * moveSpeed * Time.deltaTime);

        if (transform.position.x < despawnX)
        {
            gameObject.SetActive(false);
        }
    }
}
