import { Octokit } from "@octokit/core";

export interface ClientOptions {
  userAgent: string;
  timeoutMs: number;
}

export function createFixtureClient(options: ClientOptions): Octokit {
  Octokit.defaults({
    request: { timeout: options.timeoutMs },
  });

  return new Octokit({ userAgent: options.userAgent });
}
