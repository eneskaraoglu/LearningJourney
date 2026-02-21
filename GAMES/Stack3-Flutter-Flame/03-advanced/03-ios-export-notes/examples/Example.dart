import 'package:flame/components.dart';

class PlayerComponent extends PositionComponent {
  PlayerComponent() {
    size = Vector2.all(48);
  }

  @override
  void update(double dt) {
    super.update(dt);
    // Keep all movement calculations tied to dt.
  }
}
