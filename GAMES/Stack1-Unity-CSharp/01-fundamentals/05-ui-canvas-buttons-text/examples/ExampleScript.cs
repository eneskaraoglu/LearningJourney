using UnityEngine;

// Baseline pattern for this lesson. Replace TODO sections with topic-specific behavior.
public class ExampleScript : MonoBehaviour
{
    [SerializeField] private bool enableLogging = true;

    private void Start()
    {
        // Validate setup early to avoid hidden runtime failures.
        if (enableLogging)
        {
            Debug.Log($"{nameof(ExampleScript)} initialized on {gameObject.name}");
        }
    }

    private void Update()
    {
        // Use deltaTime-based logic to keep behavior stable across frame rates.
        float dt = Time.deltaTime;

        // TODO: Insert lesson-specific behavior here.
        if (enableLogging && dt <= 0f)
        {
            Debug.LogWarning("deltaTime was zero or negative this frame.");
        }
    }
}
