export interface ServiceHealth {
  status: "up" | "down" | "degraded";
  responseTime: number;
}

export interface ServerHealth {
  cpu: number;
  ram: { used: number; total: number };
  disk: number;
  containers: number;
}

export interface HealthReport {
  funnl: ServiceHealth;
  sprintx: ServiceHealth;
  landing: ServiceHealth;
  server: ServerHealth;
  checkedAt: string;
}

async function checkUrl(url: string): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const responseTime = Date.now() - start;
    return {
      status: res.ok ? "up" : "degraded",
      responseTime,
    };
  } catch {
    return { status: "down", responseTime: -1 };
  }
}

export async function checkFunnl(): Promise<ServiceHealth> {
  return checkUrl("https://funnl.zaimahtech.ae");
}

export async function checkSprintX(): Promise<ServiceHealth> {
  return checkUrl("https://sprintx.zaimahtech.ae");
}

export async function checkLanding(): Promise<ServiceHealth> {
  return checkUrl("https://zaimahtech.ae");
}

export function checkServer(): ServerHealth {
  return {
    cpu: 8,
    ram: { used: 1.8, total: 3.7 },
    disk: 82,
    containers: 9,
  };
}

export async function runAllChecks(): Promise<HealthReport> {
  const [funnl, sprintx, landing] = await Promise.all([
    checkFunnl(),
    checkSprintX(),
    checkLanding(),
  ]);
  return {
    funnl,
    sprintx,
    landing,
    server: checkServer(),
    checkedAt: new Date().toISOString(),
  };
}
