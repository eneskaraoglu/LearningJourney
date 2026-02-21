# Flutter + Flame Starter (Runnable)

## Run
1. `flutter pub get`
2. `flutter run -d android`

## Android Build Steps
1. Set application id in `android/app/build.gradle`.
2. Add signing config for release keystore.
3. Build appbundle with `flutter build appbundle --release`.

## iOS Notes
- Use `flutter build ios` on macOS.
- Validate notch/safe-area and texture memory usage.
