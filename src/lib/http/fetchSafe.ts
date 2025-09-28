interface FetchSafeOptions {
  timeoutMs?: number;
  retries?: number;
  backoffMs?: number;
}

interface FetchSafeResult {
  ok: boolean;
  status: number;
  json?: any;
  error?: string;
}

/**
 * Safe fetch utility that never throws and includes timeout, retries, and exponential backoff
 */
export async function fetchSafe(
  url: string, 
  init?: RequestInit, 
  opts: FetchSafeOptions = {}
): Promise<FetchSafeResult> {
  const {
    timeoutMs = 5000,
    retries = 2,
    backoffMs = 500
  } = opts;

  let lastError: string = '';
  let lastStatus: number = 0;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
        },
      });

      clearTimeout(timeoutId);

      // Try to parse JSON, but don't fail if it's not JSON
      let json: any = undefined;
      try {
        const text = await response.text();
        if (text) {
          json = JSON.parse(text);
        }
      } catch (parseError) {
        // Not JSON, that's okay
      }

      return {
        ok: response.ok,
        status: response.status,
        json,
        error: response.ok ? undefined : `HTTP ${response.status}`
      };

    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown error';
      
      // Check if it's an abort error (timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        lastError = `Timeout after ${timeoutMs}ms`;
        lastStatus = 408; // Request Timeout
      } else if (error instanceof TypeError) {
        lastError = 'Network error';
        lastStatus = 0;
      }

      // If this was the last attempt, return the error
      if (attempt === retries) {
        return {
          ok: false,
          status: lastStatus,
          error: lastError
        };
      }

      // Wait before retrying with exponential backoff
      const delay = backoffMs * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // This should never be reached, but just in case
  return {
    ok: false,
    status: lastStatus,
    error: lastError || 'Unknown error'
  };
}
