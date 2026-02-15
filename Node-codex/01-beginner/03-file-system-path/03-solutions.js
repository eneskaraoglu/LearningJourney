const fs = require('fs/promises');
const path = require('path');

async function run() {
  const dataDir = path.join(__dirname, 'data');
  const filePath = path.join(dataDir, 'notes.txt');

  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath, 'Learn Node\nPractice daily\nBuild projects\n', 'utf8');

  const text = await fs.readFile(filePath, 'utf8');
  const lines = text.trim().split(/\r?\n/);
  const words = text.trim().split(/\s+/);
  console.log('Lines:', lines.length, 'Words:', words.length);

  const stamp = new Date().toISOString();
  await fs.appendFile(filePath, `Updated at ${stamp}\n`, 'utf8');
}

run().catch((e) => console.error(e));
