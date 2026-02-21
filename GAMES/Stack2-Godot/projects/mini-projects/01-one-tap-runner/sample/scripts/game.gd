extends Node2D

@onready var player: CharacterBody2D = $Player
var score_time: float = 0.0

func _process(delta: float) -> void:
    score_time += delta
