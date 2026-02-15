function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchUser() {
  await wait(100);
  return { id: 1, name: 'Ada' };
}

async function fetchOrders(userId) {
  await wait(120);
  return [{ id: 101, userId, total: 49.9 }];
}

async function main() {
  try {
    const user = await fetchUser();
    const [orders, score] = await Promise.all([
      fetchOrders(user.id),
      Promise.resolve(87)
    ]);
    console.log({ user, orders, score });
  } catch (error) {
    console.error('Async flow failed:', error.message);
  }
}

main();
