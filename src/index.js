import { useState, useCallback } from "react";

export const useAsync = (initValue, asyncFunction) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(initValue);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState();
  const [defaultValue] = useState(initValue);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      try {
        const data = await asyncFunction(...args);
        setResult(data);
        setLoading(false);
        setLastFetch(new Date());
        return data;
      } catch (err) {
        setError(err);
        setLoading(false);
        throw err;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setResult(defaultValue);
    setError(null);
  }, [defaultValue]);

  return [{ loading, result, error, lastFetch }, execute, reset];
};
