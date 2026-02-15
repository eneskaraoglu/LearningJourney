const express = require('express');

const app = express();
app.use(express.json());

const tasks = [];

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'title is required' });
  }

  const task = { id: tasks.length + 1, title: title.trim(), done: false };
  tasks.push(task);
  return res.status(201).json(task);
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));
