import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export function useAxios<T>(url: string, config?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios(url, { ...config, cancelToken: source.token });
        setData(response.data);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) {
          // Request cancelled
        } else {
          setError(err as AxiosError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [url, config ? JSON.stringify(config) : null]);

  return { data, loading, error };
}
