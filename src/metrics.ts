// Metrics aggregator — collects enrichment telemetry across lazlo, getaways, and dags
import type { ApiConfig } from '@multi-repo-onboarding-test/testbed-api-proxy'
import type { GetawaysClient } from '@multi-repo-onboarding-test/testbed-getaways'
import type { LazloRecord } from '@multi-repo-onboarding-test/testbed-lazlo'
import type { FinanceDag } from 'testbed-dags-finance'
import type { MarketingDag } from 'testbed-dags-marketing'

export interface EnrichmentMetrics {
	lazloCount: number
	getawaysHitRate: number
	financeMatchRate: number
	marketingMatchRate: number
	latencyMs: number
}

export function computeMetrics(
	records: LazloRecord[],
	getawaysResults: Awaited<ReturnType<GetawaysClient['search']>>[],
	financeDags: FinanceDag[],
	marketingDags: MarketingDag[],
	latencyMs: number,
): EnrichmentMetrics {
	const financeIds = new Set(financeDags.map(d => d.recordId))
	const marketingIds = new Set(marketingDags.map(d => d.recordId))

	return {
		lazloCount: records.length,
		getawaysHitRate: getawaysResults.filter(r => r.hits > 0).length / Math.max(records.length, 1),
		financeMatchRate: records.filter(r => financeIds.has(r.id)).length / Math.max(records.length, 1),
		marketingMatchRate: records.filter(r => marketingIds.has(r.id)).length / Math.max(records.length, 1),
		latencyMs,
	}
}

export function logMetricsSummary(
	apiConfig: ApiConfig,
	metrics: EnrichmentMetrics,
): void {
	console.log(`[${apiConfig.baseUrl}] enrichment metrics`, metrics)
}