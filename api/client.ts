export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function withTimeout(ms: number): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller;
}

export async function apiFetch<T>(
  url: string,
  init: RequestInit & { signal?: AbortSignal } = {},
): Promise<T> {
  const { signal, ...rest } = init;

  let response: Response;
  try {
    response = await fetch(url, {
      ...rest,
      signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(rest.headers ?? {}),
      },
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    throw err;
  }

  if (!response.ok) {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }
    const message =
      typeof body === 'object' && body !== null && 'message' in body
        ? String((body as Record<string, unknown>).message)
        : `HTTP ${response.status}`;
    throw new ApiError(response.status, message, body);
  }

  return response.json() as Promise<T>;
}
