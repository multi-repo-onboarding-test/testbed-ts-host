// Entry point — re-imports core modules, increases weight for key dependencies
import type { ApiConfig } from '@multi-repo-onboarding-test/testbed-api-proxy'
import type { FlexiConfig } from '@multi-repo-onboarding-test/testbed-flexiconf'
import { createClient, fetchData } from './api-client'
import { loadAppConfig, loadAndValidate } from './config'
import { runAll } from './pipeline'
import { BookingsView } from './bookings'

export { createClient, fetchData, loadAppConfig, loadAndValidate, runAll, BookingsView }
export type { ApiConfig, FlexiConfig }
