# Unity 2D Mobile Setup

## Module Info
- Level: Intermediate programmer
- Duration: 90-120 min
- Prerequisites: C# basics, Unity Editor familiarity, Git basics

## Learning Outcomes
- Configure Unity LTS project settings for Android-first 2D development.
- Build a clean, scalable Unity folder structure for small-to-medium mobile games.
- Apply import and quality defaults that avoid common mobile performance regressions.
- Produce a verified Android development build from day one.

## Deep Dive
### Why Android-first setup matters
Android device diversity is high (resolutions, CPU/GPU tiers, RAM). If your project is configured late, bugs appear as hidden rendering issues, inconsistent touch behavior, and unstable frame-time. Early setup gives predictable behavior while features are still small.

### Unity project baseline decisions
- Use the latest Unity LTS with 2D Core template.
- Set Project Settings > Player > Color Space to Linear only if you can profile performance; otherwise start with Gamma for simpler low-end support.
- Set Application.targetFrameRate = 60 in bootstrap code and use vSync off on mobile.
- Choose one input route early. For this curriculum, we use Unity Input System package optional, but examples support direct touch via Input.touchCount to keep learning explicit.

### Recommended Unity Assets layout
Use this baseline in every project:
- Assets/Art
- Assets/Audio
- Assets/Animations
- Assets/Prefabs
- Assets/Scenes
- Assets/Scripts/Core
- Assets/Scripts/Gameplay
- Assets/Scripts/UI
- Assets/Data
- Assets/Plugins

This prevents mixed responsibilities and simplifies source-control reviews.

### Mobile import defaults
- Sprites: set Max Size to realistic values (usually 512/1024 for UI, up to 2048 for hero assets), use compression fit for target quality.
- Audio: short SFX as compressed-in-memory when needed fast; music as streaming.
- Texture filtering: avoid unnecessary high-cost settings unless visual style requires it.

### Android build baseline
- Install Android Build Support (SDK/NDK/OpenJDK) via Unity Hub.
- Set package name: com.yourstudio.gamename.
- Set minimum API level and target API level according to current Play requirements.
- Configure keystore early (even debug placeholder) to avoid pipeline surprises later.

## Worked Example
Create a bootstrap object in Bootstrap scene and attach MobileBootstrap.cs. The script sets frame-rate and sleep behavior consistently for mobile testing.

`csharp
using UnityEngine;

public class MobileBootstrap : MonoBehaviour
{
    [SerializeField] private int targetFps = 60;

    private void Awake()
    {
        // Keep app responsive and avoid platform default frame-rate variance.
        Application.targetFrameRate = targetFps;

        // Prevent screen dim during gameplay sessions while testing.
        Screen.sleepTimeout = SleepTimeout.NeverSleep;
    }
}
`

## Common Pitfalls
- Starting implementation before locking folder conventions.
- Keeping giant default scene with unrelated test objects.
- Ignoring import compression and shipping oversized textures.
- Testing only in Editor and assuming Android behavior is identical.

## Debugging Checklist
- Confirm Android module is installed and selected.
- Check one sample sprite import compression and memory footprint.
- Build and run development APK once before writing gameplay systems.
- Validate orientation, safe area, and initial touch response on device.

## Step-by-Step Practice Plan
1. Create Unity LTS 2D project and apply folder structure.
2. Add Bootstrap scene and attach MobileBootstrap.cs.
3. Configure player settings (package, orientation, API levels).
4. Import 3 sprites and 2 audio files with mobile-minded settings.
5. Produce and run a development build on Android.

## Mini Project Task
Initialize One-Tap Runner project with this exact structure and commit as project-bootstrap.

## Interview Q&A
- Q: Why set frame-rate in code instead of relying on defaults?
  A: Defaults vary by platform/device and can cause inconsistent gameplay behavior.
- Q: Why establish folder conventions early?
  A: It prevents scaling chaos and reduces merge conflicts as project grows.
- Q: What is the first real mobile validation step?
  A: A successful Android development build installed on a physical device.

## Exit Criteria
- Unity project uses clean Assets structure.
- Bootstrap scene enforces mobile defaults.
- Android development build succeeds and launches on device.
- Import settings reviewed for at least 3 textures and 2 audio clips.
