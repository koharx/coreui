import { useState, useCallback, useRef } from 'react';
import axiosInstance from '../utils/axios';
import { useAlert } from '../contexts/AlertContext';
import { logError } from '../utils/logger';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: any;
  cacheTime?: number;
}

interface UseFetchReturn<T> extends FetchState<T> {
  fetchData: (url: string, options?: FetchOptions) => Promise<void>;
  reset: () => void;
  refetch: () => Promise<void>;
}

const cache = new Map<string, { data: any; timestamp: number }>();

export const useFetch = <T>(): UseFetchReturn<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const lastUrlRef = useRef<string>('');
  const lastOptionsRef = useRef<FetchOptions>({});

  const { showError } = useAlert();

  const fetchData = useCallback(async (url: string, options: FetchOptions = {}) => {
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    const cachedData = cache.get(cacheKey);
    const now = Date.now();

    if (cachedData && options.cacheTime && now - cachedData.timestamp < options.cacheTime) {
      setState({
        data: cachedData.data,
        loading: false,
        error: null,
      });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    lastUrlRef.current = url;
    lastOptionsRef.current = options;
    
    try {
      let headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
      if (options.headers) {
        if (options.headers instanceof Headers) {
          options.headers.forEach((value, key) => {
            headers[key] = value;
          });
        } else if (typeof options.headers === 'object' && !Array.isArray(options.headers)) {
          headers = { ...headers, ...options.headers };
        }
      }
      const { body, cache: fetchCache, credentials, integrity, keepalive, method, mode, redirect, referrer, referrerPolicy, signal, ...axiosOptions } = options;
      const response = await axiosInstance({
        url,
        ...axiosOptions,
        headers,
        data: body,
        method,
      });
      
      const data = response.data as T;
      
      if (options.cacheTime) {
        cache.set(cacheKey, { data, timestamp: now });
      }

      setState({
        data,
        loading: false,
        error: null,
      });
    } catch (error) {
      const err = error as Error;
      logError(err, 'Fetch Error');
      showError(err.message || 'An error occurred while fetching data');
      setState({
        data: null,
        loading: false,
        error: err,
      });
    }
  }, [showError]);

  const refetch = useCallback(async () => {
    if (lastUrlRef.current) {
      await fetchData(lastUrlRef.current, lastOptionsRef.current);
    }
  }, [fetchData]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
    lastUrlRef.current = '';
    lastOptionsRef.current = {};
  }, []);

  return {
    ...state,
    fetchData,
    reset,
    refetch,
  };
}; 