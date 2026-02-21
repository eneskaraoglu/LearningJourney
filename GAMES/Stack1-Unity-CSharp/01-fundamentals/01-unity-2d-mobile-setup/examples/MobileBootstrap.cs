using UnityEngine;

// Initializes mobile runtime defaults as early as possible.
public class MobileBootstrap : MonoBehaviour
{
    [SerializeField] private int targetFps = 60;

    private void Awake()
    {
        // Stabilize gameplay speed across devices with varying refresh behavior.
        Application.targetFrameRate = Mathf.Clamp(targetFps, 30, 120);

        // Keep screen awake during active gameplay tests.
        Screen.sleepTimeout = SleepTimeout.NeverSleep;

        Debug.Log($"Mobile bootstrap initialized at {Application.targetFrameRate} FPS");
    }
}
