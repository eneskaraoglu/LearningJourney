import 'package:flame/game.dart';
import 'package:flutter/material.dart';
import 'game/runner_game.dart';

void main() {
  runApp(const RunnerApp());
}

class RunnerApp extends StatelessWidget {
  const RunnerApp({super.key});

  @override
  Widget build(BuildContext context) {
    final game = RunnerGame();
    return MaterialApp(
      home: Scaffold(
        body: GameWidget(
          game: game,
          overlayBuilderMap: {
            'hud': (_, __) => const SafeArea(child: Align(alignment: Alignment.topCenter, child: Text('One Tap Runner'))),
          },
          initialActiveOverlays: const ['hud'],
        ),
      ),
    );
  }
}
