import { useState, useEffect, useCallback } from "react";

interface UseFetchDataResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  isRefetching: boolean;
}

interface UseFetchDataProps<T> {
  queryKey: any[];
  queryFn: () => Promise<T>;
}

function useFetchData<T>({ queryKey, queryFn }: UseFetchDataProps<T>): UseFetchDataResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    try {
      const result = await queryFn();
      setData(result);
    } catch (err) {
      setIsError(true);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    fetchData();
  }, queryKey); // Re-fetch data when queryKey changes

  const refetch = async () => {
    setIsRefetching(true);
    await fetchData();
    setIsRefetching(false);
  };

  return { data, isLoading, isError, error, refetch, isRefetching };
}

export default useFetchData;
