// Entry point — re-imports core modules, increases weight for key dependencies
import type { ApiConfig } from '@multi-repo-onboarding-test/testbed-api-proxy'
import type { FlexiConfig } from '@multi-repo-onboarding-test/testbed-flexiconf'
import { createClient } from './api-client'
import { loadAppConfig } from './config'
import { runMarketingPipeline } from './pipeline'
import { BookingsView } from './bookings'

export { createClient, loadAppConfig, runMarketingPipeline, BookingsView }
export type { ApiConfig, FlexiConfig }
