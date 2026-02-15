const products = [
  { id: 1, name: 'Keyboard', category: 'hardware' },
  { id: 2, name: 'Mouse', category: 'hardware' },
  { id: 3, name: 'Node Course', category: 'digital' }
];

function paginate(list, page, limit) {
  const start = (page - 1) * limit;
  const data = list.slice(start, start + limit);
  return {
    data,
    meta: { page, limit, total: list.length, pages: Math.ceil(list.length / limit) }
  };
}

function getProducts({ page = 1, limit = 10, category }) {
  const filtered = category ? products.filter((p) => p.category === category) : products;
  return paginate(filtered, Number(page), Number(limit));
}

function getProductById(id) {
  return products.find((p) => p.id === Number(id)) || null;
}

console.log(getProducts({ page: 1, limit: 2, category: 'hardware' }));
console.log(getProductById(99));
