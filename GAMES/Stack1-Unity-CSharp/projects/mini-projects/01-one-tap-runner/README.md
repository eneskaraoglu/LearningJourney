# One-Tap Runner (Mini Project 01)

## Goal
Build a beginner-friendly 2D endless runner for mobile where one tap triggers jump.

## Core Features
- One-tap jump input
- Endless obstacle spawning
- Score over time
- Collision-based game over
- Best score persistence with PlayerPrefs
- Basic object pooling for obstacles

## Unity Folder Layout
- Assets/Scenes: Boot, Game
- Assets/Scripts/Core: startup + game state
- Assets/Scripts/Gameplay: runner, obstacles, scoring
- Assets/Scripts/UI: score and game-over UI
- Assets/Prefabs: runner, obstacle
- Assets/Audio: jump/hit clips

## Build Target
- Android first (development build for internal testing)

## Steps
1. Create Game scene and setup ground, runner, obstacle spawn point.
2. Attach scripts from Assets/Scripts.
3. Wire references in Inspector.
4. Test in Editor, then on Android device.
