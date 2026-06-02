/**
 * Run async tasks with a max concurrency limit.
 * @template T
 * @param {T[]} items
 * @param {number} limit
 * @param {(item: T, index: number) => Promise<unknown>} worker
 */
export async function mapWithConcurrency(items, limit, worker) {
  if (!items.length) {
    return [];
  }

  const results = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  }

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    () => runWorker()
  );

  await Promise.all(workers);
  return results;
}
