// Legacy integrations — imports archived and placeholder repos to test pre-filter
import type { ShellCommand } from '@multi-repo-onboarding-test/testbed-archived-shell'
import type { StubClient } from '@multi-repo-onboarding-test/testbed-placeholder-stub'

export function runLegacyShell(cmd: ShellCommand): void {
	console.log('legacy shell:', cmd)
}

export function createStub(): StubClient {
	throw new Error('not implemented')
}
