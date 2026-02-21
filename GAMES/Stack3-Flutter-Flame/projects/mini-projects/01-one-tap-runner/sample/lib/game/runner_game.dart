import 'package:flame/events.dart';
import 'package:flame/game.dart';

class RunnerGame extends FlameGame with TapDetector {
  double distance = 0;
  final double speed = 220;

  @override
  void update(double dt) {
    super.update(dt);
    distance += speed * dt;
  }

  @override
  void onTap() {
    // Hook jump command here.
  }
}
