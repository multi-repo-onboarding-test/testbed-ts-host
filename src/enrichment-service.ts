// Enrichment service — aggregates data across lazlo, getaways, and finance pipeline
import type { ApiConfig, ProxyClient } from '@multi-repo-onboarding-test/testbed-api-proxy'
import { createProxyClient } from '@multi-repo-onboarding-test/testbed-api-proxy'
import type { ProxyConfig } from '@multi-repo-onboarding-test/testbed-api-proxy-config'
import type { FlexiConf } from '@multi-repo-onboarding-test/testbed-flexiconf'
import type { GetawaysClient } from '@multi-repo-onboarding-test/testbed-getaways'
import { createGetawaysClient } from '@multi-repo-onboarding-test/testbed-getaways'
import type { LazloRecord } from '@multi-repo-onboarding-test/testbed-lazlo'
import { fetchLazloRecords } from '@multi-repo-onboarding-test/testbed-lazlo'
import { triggerWorkflow } from 'testbed-composer3-workflows'
import type { FinanceDag } from 'testbed-dags-finance'
import axios from 'axios'
import lodash from 'lodash'

export interface EnrichmentContext {
	apiConfig: ApiConfig
	proxyConfig: ProxyConfig
	featureFlags: FlexiConf
}

export interface EnrichedRecord {
	lazlo: LazloRecord
	getaways: Awaited<ReturnType<GetawaysClient['search']>>
	financeDagId: string
}

export async function enrichRecords(
	ctx: EnrichmentContext,
	dags: FinanceDag[],
): Promise<EnrichedRecord[]> {
	const proxy: ProxyClient = createProxyClient(ctx.apiConfig, ctx.proxyConfig)
	const getaways = createGetawaysClient({ proxy: proxy.proxyOptions() })

	const lazloRecords = await fetchLazloRecords(ctx.apiConfig.baseUrl)

	const enriched = await Promise.all(
		lazloRecords.map(async (record) => {
			const getawayResults = await getaways.search({ recordId: record.id })
			const dag = lodash.find(dags, (d) => d.recordId === record.id)

			if (dag) {
				await triggerWorkflow(dag.id)
			}

			return {
				lazlo: record,
				getaways: getawayResults,
				financeDagId: dag?.id ?? '',
			}
		}),
	)

	return enriched
}

export async function fetchEnrichmentMetadata(baseUrl: string) {
	const response = await axios.get(`${baseUrl}/enrichment/metadata`)
	return response.data
}
