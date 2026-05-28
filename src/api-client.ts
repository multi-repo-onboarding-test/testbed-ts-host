// Core API proxy client — high-weight scoped imports (imported across multiple files)
import type { ApiConfig, ProxyClient } from '@multi-repo-onboarding-test/testbed-api-proxy'
import { createProxyClient } from '@multi-repo-onboarding-test/testbed-api-proxy'
import type { ProxyConfig } from '@multi-repo-onboarding-test/testbed-api-proxy-config'
import axios from 'axios'

export function createClient(config: ApiConfig, proxyConfig: ProxyConfig): ProxyClient {
	return createProxyClient(config, proxyConfig)
}

export async function fetchData(url: string, client: ProxyClient) {
	const response = await axios.get(url, { proxy: client.proxyOptions() })
	return response.data
}
