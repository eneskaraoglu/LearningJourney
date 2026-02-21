# Stack3-Flutter-Flame

## Learning Objectives
- Build simple, all-ages 2D mobile games with Flutter stable + Flame.
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

## Android Build Steps (Flutter + Flame)
1. Set `applicationId` and versioning in Android Gradle config.
2. Configure release signing keystore.
3. Run `flutter build appbundle --release`.
4. Validate startup, frame pacing, and touch latency on physical devices.

## iOS Export Notes (Flutter + Flame)
- iOS build requires macOS + Xcode.
- Run `flutter build ios` and complete signing in Xcode.
- Validate safe-area overlays and texture memory on lower-end devices.
