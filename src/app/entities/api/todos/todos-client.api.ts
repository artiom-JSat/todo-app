type RequestOptions = RequestInit & {
  json?: unknown;
};

async function apiFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { json, ...rest } = options;

  const config: RequestInit = {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...rest.headers,
    },
  };

  if (json) {
    config.body = JSON.stringify(json);
  }

  const response = await fetch(`/api${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: <T>(url: string) => apiFetch<T>(url, { method: 'GET' }),
  post: <T, D = unknown>(url: string, data: D) => apiFetch<T>(url, { method: 'POST', json: data }),
  patch: <T, D = unknown>(url: string, data: D) => apiFetch<T>(url, { method: 'PATCH', json: data }),
  delete: <T>(url: string) => apiFetch<T>(url, { method: 'DELETE' }),
};