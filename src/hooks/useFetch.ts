import { useEffect, useRef, useState } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => void;
}

const cache = new Map<string, any>();

function useFetch<T = any>(url: string, options?: RequestInit): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const refetch = () => setReload(r => r + 1);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    if (cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }
    abortRef.current = new AbortController();
    fetch(url, { ...options, signal: abortRef.current.signal })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(json => {
        if (!ignore) {
          setData(json);
          cache.set(url, json);
        }
      })
      .catch(e => {
        if (!ignore && e.name !== 'AbortError') setError(e);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
      abortRef.current?.abort();
    };
  }, [url, reload]);

  return { data, error, loading, refetch };
}

export default useFetch; 