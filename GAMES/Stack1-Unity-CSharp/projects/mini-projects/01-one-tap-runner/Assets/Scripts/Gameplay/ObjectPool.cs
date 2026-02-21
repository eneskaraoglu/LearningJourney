using System.Collections.Generic;
using UnityEngine;

// Simple non-generic pool for obstacle prefabs.
public class ObjectPool : MonoBehaviour
{
    [SerializeField] private GameObject prefab;
    [SerializeField] private int initialSize = 10;

    private readonly Queue<GameObject> pool = new Queue<GameObject>();

    private void Awake()
    {
        for (int i = 0; i < initialSize; i++)
        {
            CreateAndStore();
        }
    }

    public GameObject Get()
    {
        if (pool.Count == 0)
        {
            CreateAndStore();
        }

        GameObject item = pool.Dequeue();

        // Re-enqueue when disabled so object can be reused.
        StartCoroutine(ReturnWhenDisabled(item));
        return item;
    }

    private void CreateAndStore()
    {
        GameObject item = Instantiate(prefab, transform);
        item.SetActive(false);
        pool.Enqueue(item);
    }

    private System.Collections.IEnumerator ReturnWhenDisabled(GameObject item)
    {
        while (item.activeSelf)
        {
            yield return null;
        }

        pool.Enqueue(item);
    }
}
