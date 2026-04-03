import fs from 'fs/promises';
import path from 'path';

const dataDirectory = path.resolve('backend', 'data');
const historyFile = path.join(dataDirectory, 'analysis-history.json');

async function ensureStore() {
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    await fs.access(historyFile);
  } catch {
    await fs.writeFile(historyFile, '[]', 'utf8');
  }
}

export async function readHistory() {
  await ensureStore();
  const raw = await fs.readFile(historyFile, 'utf8');
  return JSON.parse(raw);
}

export async function writeHistory(history) {
  await ensureStore();
  await fs.writeFile(historyFile, JSON.stringify(history, null, 2), 'utf8');
}

export async function saveRecord(record) {
  const history = await readHistory();
  const nextHistory = [record, ...history].slice(0, 50);
  await writeHistory(nextHistory);
  return nextHistory;
}
