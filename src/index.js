import { useState, useCallback } from "react";

export const useAsync = (initValue, asyncFunction) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(initValue);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState();

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const data = await asyncFunction(...arguments);
      setResult(data);
      setLoading(false);
      setLastFetch(new Date());
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  });

  const reset = useCallback(() => {
    setLoading(false);
    setResult(initValue);
    setError(null);
  }, [initValue]);

  return [{ loading, result, error, lastFetch }, execute, reset];
};
