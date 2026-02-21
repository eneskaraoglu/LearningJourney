extends CharacterBody2D

@export var gravity: float = 1800.0
@export var jump_force: float = -620.0

func _physics_process(delta: float) -> void:
    velocity.y += gravity * delta

    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = jump_force

    move_and_slide()
