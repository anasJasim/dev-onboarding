export const baseUrl = 'http://127.0.0.1:8050'
export const apiUrl = `${baseUrl}/api/v1`

export const contentType = {
	json: { 'content-type': 'application/json' }
}

export function fetchFromBase(url: string, init: RequestInit) {
	return fetch(`${baseUrl}${url}`, { ...init })
}

export function fetchApi(url: string, init: RequestInit = {}) {
	return fetch(`${apiUrl}${url}`, { ...init })
}

export function getRequest(url: string, init: RequestInit = {}) {
	return fetchApi(url, { method: 'GET', ...init })
}

export function postRequest(url: string, init: RequestInit = {}) {
	return fetchApi(url, { method: 'POST', ...init })
}

export function deleteRequest(url: string, init: RequestInit = {}) {
	return fetchApi(url, { method: 'DELETE', ...init })
}
