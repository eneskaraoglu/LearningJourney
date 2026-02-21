using UnityEngine;
using System.IO;

// Lightweight runtime validator for critical project folders.
public class ProjectValidator : MonoBehaviour
{
    private static readonly string[] RequiredFolders =
    {
        "Assets/Scenes",
        "Assets/Scripts/Core",
        "Assets/Scripts/Gameplay",
        "Assets/Scripts/UI",
        "Assets/Prefabs"
    };

    private void Start()
    {
        foreach (string folder in RequiredFolders)
        {
            // Logs missing folders early so setup drift is visible.
            if (!Directory.Exists(folder))
            {
                Debug.LogWarning($"Missing required folder: {folder}");
            }
        }
    }
}
