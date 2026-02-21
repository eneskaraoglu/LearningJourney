using UnityEngine;

// Reads touch or mouse click and applies upward jump force.
[RequireComponent(typeof(Rigidbody2D))]
public class PlayerJumpController : MonoBehaviour
{
    [SerializeField] private float jumpForce = 7f;
    [SerializeField] private LayerMask groundLayer;
    [SerializeField] private Transform groundCheck;
    [SerializeField] private float groundCheckRadius = 0.2f;

    private Rigidbody2D rb;

    private void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    private void Update()
    {
        if (GameManager.Instance == null) return;

        // First tap starts the run.
        if (GameManager.Instance.CurrentState == GameManager.GameState.Start && IsTapDown())
        {
            GameManager.Instance.BeginRun();
        }

        if (GameManager.Instance.CurrentState != GameManager.GameState.Playing) return;

        if (IsTapDown() && IsGrounded())
        {
            Jump();
        }
    }

    private void Jump()
    {
        // Reset Y velocity for consistent jump height before applying impulse.
        rb.velocity = new Vector2(rb.velocity.x, 0f);
        rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
    }

    private bool IsTapDown()
    {
        // Mobile touch primary path.
        if (Input.touchCount > 0)
        {
            return Input.GetTouch(0).phase == TouchPhase.Began;
        }

        // Editor fallback for quick testing.
        return Input.GetMouseButtonDown(0);
    }

    private bool IsGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, groundLayer);
    }
}
