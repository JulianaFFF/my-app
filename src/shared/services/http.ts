const API_BASE_URL = "http://127.0.0.1:8080/api";

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

 
  if (!response.ok) {
    let errorMessage = `Request error: ${response.status} ${response.statusText}`;
    try {
      const errorInfo = await response.json();
      errorMessage = errorInfo.detail || errorInfo.message || errorMessage;
    } catch {
      
    }
    throw new Error(errorMessage);
  }

 
  const contentType = response.headers.get("content-type");
  if (response.status === 204 || !contentType?.includes("application/json")) {
    return undefined as T;
  }

 
  return response.json() as Promise<T>;
}