import { useCallback, useEffect, useRef, useState } from 'react';

const responseCache = new Map();

const normalizeResponse = (response) => (
  Array.isArray(response) ? response : (response?.docs ?? response ?? [])
);

const useFetch = (fetchFn, options = {}) => {
  const { cacheKey, enabled = true, keepPreviousData = true } = options;
  const [data, setData] = useState(() => (
    cacheKey && responseCache.has(cacheKey) ? responseCache.get(cacheKey) : []
  ));
  const [loading, setLoading] = useState(() => (
    enabled && !(cacheKey && responseCache.has(cacheKey))
  ));
  const [error, setError] = useState(null);
  const isMountedRef = useRef(false);

  const runFetch = useCallback(async (force = false) => {
    if (!enabled) {
      return [];
    }

    const hasCache = cacheKey && responseCache.has(cacheKey);
    if (hasCache && !force) {
      const cachedData = responseCache.get(cacheKey);
      if (isMountedRef.current) {
        setData(cachedData);
        setError(null);
        setLoading(false);
      }
      return cachedData;
    }

    if (!keepPreviousData && isMountedRef.current) {
      setData([]);
    }

    if (isMountedRef.current) {
      setLoading(true);
    }

    try {
      const response = await fetchFn();
      const normalizedData = normalizeResponse(response);

      if (!isMountedRef.current) {
        return normalizedData;
      }

      if (cacheKey) {
        responseCache.set(cacheKey, normalizedData);
      }

      setData(normalizedData);
      setError(null);
      return normalizedData;
    } catch (err) {
      if (!isMountedRef.current) {
        return [];
      }

      setError(err.message || 'Unknown error');
      return [];
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [cacheKey, enabled, fetchFn, keepPreviousData]);

  useEffect(() => {
    isMountedRef.current = true;

    if (!enabled) {
      setLoading(false);
      return () => {
        isMountedRef.current = false;
      };
    }

    void runFetch();

    return () => {
      isMountedRef.current = false;
    };
  }, [enabled, runFetch]);

  const refetch = useCallback(() => runFetch(true), [runFetch]);

  return { data, loading, error, refetch };
};

export default useFetch;
