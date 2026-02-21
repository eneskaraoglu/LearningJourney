# Unity 2D Mobile Cheatsheet (Unity LTS + C#)

## Core Update Loops
- Update(): input, timers, non-physics movement (with Time.deltaTime)
- FixedUpdate(): physics interactions (Rigidbody2D)
- LateUpdate(): camera follow and post-movement adjustments

## Touch Input
- Tap begin: Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began
- Swipe delta: currentTouch.position - startPosition
- Editor fallback: Input.GetMouseButtonDown(0)

## Physics 2D
- Trigger events: OnTriggerEnter2D(Collider2D other)
- Collision events: OnCollisionEnter2D(Collision2D collision)
- Ground check: Physics2D.OverlapCircle(...)

## Scene Management
- Load scene: SceneManager.LoadScene("Game")
- Restart current: SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex)

## Audio Basics
- SFX: udioSource.PlayOneShot(clip)
- Music: looped AudioSource
- Global volume: AudioMixer exposed parameter

## Save Data (PlayerPrefs)
- Save int: PlayerPrefs.SetInt("best_score", score)
- Load int: PlayerPrefs.GetInt("best_score", 0)
- Persist now: PlayerPrefs.Save()

## Performance Tips
- Replace frequent instantiate/destroy with object pools.
- Cache component references in Awake/Start.
- Avoid string concatenation and new allocations in Update.
- Profile on real Android device, not only Editor.

## Android Build Quick Steps
1. File -> Build Settings -> Android -> Switch Platform
2. Player Settings -> package id, orientation, API levels
3. Configure keystore signing
4. Build Development APK first
5. Build release AAB for Play Console

## Unity Project Organization
- Assets/Scripts/Core: bootstrap, game state, managers
- Assets/Scripts/Gameplay: player, enemy, spawning, rules
- Assets/Scripts/UI: HUD and menus
- Assets/Prefabs: reusable gameplay objects
- Assets/Scenes: Boot, Menu, Game, Result
