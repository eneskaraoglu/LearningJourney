# Stack2-Godot

## Learning Objectives
- Build simple, all-ages 2D mobile games with Godot 4.x + GDScript.
- Implement robust gameplay systems from loop, input, collisions, UI, and save.
- Follow a production-minded Android-first pipeline, then adapt for iOS.

## Progress Tracker Checklist
- [ ] Phase A complete (Core 2D Mobile Game Fundamentals)
- [ ] Phase B complete (Casual Game Design)
- [ ] Phase C complete (Publishing)
- [ ] Mini Project: One-Tap Runner complete
- [ ] Mini Project: Color Match Game complete
- [ ] Mini Project: Simple Puzzle Game complete
- [ ] Capstone MVP complete
- [ ] Android release candidate complete
- [ ] iOS export notes reviewed and backlog created

## Milestones
1. Milestone 1: Core systems playable.
2. Milestone 2: UX depth (UI flow/audio/save/feedback).
3. Milestone 3: Performance pass (pooling and optimization).
4. Milestone 4: Casual design quality.
5. Milestone 5: Shipping readiness.

## Publishing Roadmap (Android -> iOS)
1. Android baseline build and on-device smoke test.
2. Internal test build with crash/performance validation.
3. Play Store prep: listing assets, privacy policy, QA checklist.
4. iOS adaptation: orientation/safe area/performance checks.
5. TestFlight and App Store metadata preparation.

## Folder Usage Explanation
- `01-fundamentals`: Phase A lessons 01-09.
- `02-intermediate`: Phase B lessons 01-05.
- `03-advanced`: Phase C lessons 01-03.
- `projects/mini-projects`: Three guided build projects.
- `projects/capstone`: Play Store-ready production project blueprint.
- `notes/cheatsheet.md`: Fast reference while coding.

## Android Build Steps (Godot 4.x)
1. Install Android export templates in Godot.
2. Set SDK, JDK, and debug keystore paths in Editor Settings.
3. Create Android export preset (package name, version code, permissions).
4. Export APK for device testing, then AAB for Play Store submission.

## iOS Export Notes (Godot 4.x)
- iOS export requires macOS and Xcode.
- Configure signing/team in generated Xcode project.
- Re-test safe area and memory usage on older iPhones.
