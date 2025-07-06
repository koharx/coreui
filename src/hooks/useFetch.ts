import { useState, useEffect, useCallback } from "react";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchOptions {
  immediate?: boolean;
  dependencies?: unknown[];
}

export const useFetch = <T = unknown>(
  url: string,
  options: FetchOptions = {},
  fetchOptions: UseFetchOptions = {}
) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: options.body,
        signal: options.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }, [url, options.method, options.headers, options.body, options.signal]);

  useEffect(() => {
    if (fetchOptions.immediate !== false) {
      fetchData();
    }
  }, [fetchData, fetchOptions.immediate]);

  return {
    ...state,
    refetch: fetchData,
  };
}; 