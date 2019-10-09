import { useState, useEffect, useCallback } from "react";

export const useAsync = (asyncCall, defaultOptions) => {
  const [options, setOptions] = useState({
    executeOnChange: true,
    ...defaultOptions
  });
  const [loading, setLoading] = useState(false);
  const [invalidate, setInvalidate] = useState(false);
  const [result, setResult] = useState({});
  const [error, setError] = useState();

  const call = useCallback(
    overideAsyncCall => {
      setLoading(true);
      const func = overideAsyncCall || asyncCall;
      return func()
        .then(res => {
          setResult(res);
          return res;
        })
        .catch(err => {
          setError(err);
          return err;
        })
        .finally(() => {
          setInvalidate(false);
          setLoading(false);
        });
    },
    [asyncCall]
  );

  const forceExecute = overideAsyncCall => call(overideAsyncCall);

  useEffect(() => {
    if (invalidate) {
      call();
    }
  }, [call, invalidate]);

  useEffect(() => {
    if (options.executeOnChange) {
      setInvalidate(true);
    }
  }, [asyncCall, options.executeOnChange]);

  return {
    options,
    loading,
    result,
    error,
    forceExecute,
    setOptions
  };
};
