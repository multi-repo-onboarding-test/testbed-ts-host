// Ingestion pipeline — pulls data from api-proxy and runs through finance/marketing dags
import type { ApiConfig } from '@multi-repo-onboarding-test/testbed-api-proxy'
import { createProxyClient } from '@multi-repo-onboarding-test/testbed-api-proxy'
import type { ProxyConfig } from '@multi-repo-onboarding-test/testbed-api-proxy-config'
import type { FinanceDag } from 'testbed-dags-finance'
import type { MarketingDag } from 'testbed-dags-marketing'
import type { IngestionTf } from 'testbed-ingestion-tf'
import axios from 'axios'
import lodash from 'lodash'

export async function ingestData(
	apiConfig: ApiConfig,
	proxyConfig: ProxyConfig,
	dags: { finance: FinanceDag; marketing: MarketingDag },
	infra: IngestionTf,
) {
	const client = createProxyClient(apiConfig, proxyConfig)
	const data = await axios.get('/ingest', { proxy: client.proxyOptions() })
	const selectedDags = lodash.pick(dags, ['finance', 'marketing'])
	return { data, dags: selectedDags, infra }
}
