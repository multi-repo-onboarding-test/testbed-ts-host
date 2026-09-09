// Pipeline orchestration — unscoped imports (lower confidence candidates)
import { triggerWorkflow } from 'testbed-composer3-workflows'
import type { MarketingDag } from 'testbed-dags-marketing'
import type { FinanceDag } from 'testbed-dags-finance'
import lodash from 'lodash'

export function runMarketingPipeline(dag: MarketingDag) {
	if (dag.id.trim().length === 0) {
		throw new Error('Marketing workflow ID is required')
	}
	return triggerWorkflow(dag.id)
}

export function runFinancePipeline(dag: FinanceDag) {
	return triggerWorkflow(lodash.kebabCase(dag.id))
}

export function runAll(dags: { marketing: MarketingDag; finance: FinanceDag }) {
	return Promise.all([runMarketingPipeline(dags.marketing), runFinancePipeline(dags.finance)])
}
