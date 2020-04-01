import { useState } from "react";

export const useAsync = (asyncFunction, initValue = null) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(initValue);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState();

  // Using .apply() to pass arguments
  function execute() {
    setLoading(true);
    setResult(null);
    setError(null);
    asyncFunction
      .apply(this, arguments)
      .then(data => {
        setResult(data);
        setLastFetch(new Date());
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }

  return [{ loading, result, error, lastFetch }, execute];
};
