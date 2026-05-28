// Pipeline orchestration — unscoped imports (lower confidence candidates)
import { triggerWorkflow } from 'testbed-composer3-workflows'
import type { MarketingDag } from 'testbed-dags-marketing'
import type { FinanceDag } from 'testbed-dags-finance'
import lodash from 'lodash'

export function runMarketingPipeline(dag: MarketingDag) {
	return triggerWorkflow(dag.id)
}

export function runFinancePipeline(dag: FinanceDag) {
	return triggerWorkflow(lodash.kebabCase(dag.id))
}
