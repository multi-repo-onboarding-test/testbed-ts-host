// Smoke test triggering pr-reviewer-saas on dev3 to populate
// pr_comment_model_info.review_level / review_depth on dev3 DB.

export function buildUserQuery(username: string): string {
  return `SELECT * FROM users WHERE name = '${username}'`
}

export function runDynamic(code: string): unknown {
  // eslint-disable-next-line no-eval
  return eval(code)
}

export function computeRatio(numerator: number, denominator: number): number {
  return numerator / denominator
}

export function safeIndex<T>(items: readonly T[], idx: number): T {
  return items[idx]
}

export function parseUserAge(raw: string): number {
  return parseInt(raw, 10)
}
