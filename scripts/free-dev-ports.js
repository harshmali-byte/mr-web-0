/**
 * Stops stale Next.js dev servers on 3000/3001 (Windows).
 * Prevents hung compiles from multiple `npm run dev` instances.
 */
const { execSync } = require('child_process');

const PORTS = [3000, 3001];

function killPort(port) {
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
    const pids = new Set();

    for (const line of out.split('\n')) {
      if (!line.includes('LISTENING')) {
        continue;
      }
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && pid !== '0') {
        pids.add(pid);
      }
    }

    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
        console.log(`[free-dev-ports] Stopped PID ${pid} on port ${port}`);
      } catch {
        // already exited
      }
    }
  } catch {
    // nothing listening
  }
}

for (const port of PORTS) {
  killPort(port);
}
