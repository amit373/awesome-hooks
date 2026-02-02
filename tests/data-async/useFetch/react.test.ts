import { act, renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../../../hooks/data-async/useFetch/react';

describe('useFetch', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should fetch data successfully', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'mock data' }),
        clone: () => ({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ data: 'mock data' }),
        }),
      } as Response)
    );

    const { result } = renderHook(() => useFetch('/api/test'));

    // Initially loading should be true
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({ data: 'mock data' });
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle fetch errors', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve({ message: 'Not Found' }),
        clone: () => ({
          ok: false,
          status: 404,
          statusText: 'Not Found',
          json: () => Promise.resolve({ message: 'Not Found' }),
        }),
      } as Response)
    );

    const { result } = renderHook(() => useFetch('/api/test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error!.message).toContain('HTTP error');
    });
  });

  it('should handle network errors', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.reject(new Error('Network error'));
    });

    const { result } = renderHook(() => useFetch('/api/test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error!.message).toBe('Network error');
    });
  });

  it('should call fetch twice when refetch is called', async () => {
    const uniqueUrl = '/api/test-' + Date.now();

    // Clear all mocks to ensure clean state
    jest.clearAllMocks();

    // Create a spy that only responds to our unique URL
    const fetchSpy = jest.fn().mockImplementation((input, init) => {
      if (input === uniqueUrl) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ data: 'test data' }),
          clone: () => ({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ data: 'test data' }),
          }),
        } as Response);
      }
      // For other URLs, return a rejected promise to avoid interference
      return Promise.reject(new Error(`Unexpected URL: ${input}`));
    });

    jest.spyOn(global, 'fetch').mockImplementation(fetchSpy);

    const { result } = renderHook(() =>
      useFetch(uniqueUrl, { refetchOnWindowFocus: false })
    );

    // Wait for the initial fetch
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check that our unique URL was called exactly once
    expect(fetchSpy).toHaveBeenCalledWith(
      uniqueUrl,
      expect.objectContaining({ refetchOnWindowFocus: false })
    );
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // Call refetch
    await act(async () => {
      result.current.refetch();
    });

    // Wait for the refetch
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Check that our unique URL was called exactly twice
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenNthCalledWith(
      1,
      uniqueUrl,
      expect.objectContaining({ refetchOnWindowFocus: false })
    );
    expect(fetchSpy).toHaveBeenNthCalledWith(
      2,
      uniqueUrl,
      expect.objectContaining({ refetchOnWindowFocus: false })
    );
  });

  it('should abort request when abort is called', async () => {
    const abortControllerSpy = jest.spyOn(
      global.AbortController.prototype,
      'abort'
    );

    const { result } = renderHook(() => useFetch('/api/test'));

    result.current.abort();

    expect(abortControllerSpy).toHaveBeenCalled();
  });

  it('should work with manual fetching', async () => {
    // Initially should not make any fetch calls
    const fetchMock = jest.fn().mockResolvedValue(
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'mock data' }),
        clone: () => ({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ data: 'mock data' }),
        }),
      } as Response)
    );

    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

    const { result } = renderHook(() =>
      useFetch('/api/test', { manual: true })
    );

    // Should not fetch automatically when manual is true
    expect(result.current.loading).toBe(false);
    // Verify fetch was not called
    expect(fetchMock).not.toHaveBeenCalled();

    // Manually trigger fetch
    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({ data: 'mock data' });
    });
  });

  it('should handle initial data', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'mock data' }),
        clone: () => ({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ data: 'mock data' }),
        }),
      } as Response)
    );

    const { result } = renderHook(() =>
      useFetch('/api/test', { initialData: { cached: 'data' } })
    );

    expect(result.current.data).toEqual({ cached: 'data' });

    await waitFor(() => {
      expect(result.current.data).toEqual({ data: 'mock data' });
    });
  });
});
