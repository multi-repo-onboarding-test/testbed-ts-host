// Config loader — scoped import for flexiconf
import type { FlexiConfig, FlexiSchema } from '@multi-repo-onboarding-test/testbed-flexiconf'
import { loadConfig, validateSchema } from '@multi-repo-onboarding-test/testbed-flexiconf'

export function loadAppConfig(path: string): FlexiConfig {
	return loadConfig(path)
}

export function validateConfig(config: FlexiConfig, schema: FlexiSchema): boolean {
	return validateSchema(config, schema)
}
