// Retry wrapper for enrichment operations using cross-repo error types
import type { ApiConfig } from '@multi-repo-onboarding-test/testbed-api-proxy'
import type { FlexiConf } from '@multi-repo-onboarding-test/testbed-flexiconf'
import type { LazloRecord } from '@multi-repo-onboarding-test/testbed-lazlo'
import { fetchLazloRecords } from '@multi-repo-onboarding-test/testbed-lazlo'
import type { FinanceDag } from 'testbed-dags-finance'
import type { MarketingDag } from 'testbed-dags-marketing'

export interface RetryConfig {
	maxAttempts: number
	backoffMs: number
	featureFlags: FlexiConf
}

export async function fetchWithRetry(
	apiConfig: ApiConfig,
	config: RetryConfig,
): Promise<LazloRecord[]> {
	let lastError: unknown
	for (let attempt = 0; attempt < config.maxAttempts; attempt++) {
		try {
			return await fetchLazloRecords(apiConfig.baseUrl)
		} catch (err) {
			lastError = err
			await new Promise(resolve => setTimeout(resolve, config.backoffMs * (attempt + 1)))
		}
	}
	throw lastError
}

export function mergeDags(
	finance: FinanceDag[],
	marketing: MarketingDag[],
): Array<{ id: string; type: 'finance' | 'marketing' }> {
	return [
		...finance.map(d => ({ id: d.id, type: 'finance' as const })),
		...marketing.map(d => ({ id: d.id, type: 'marketing' as const })),
	]
}