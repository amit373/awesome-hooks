import { act, renderHook } from '@testing-library/react';
import { useSWR } from '../../../hooks/data-async/useSWR/react';

describe('useSWR (React)', () => {
  it('should fetch and cache data', async () => {
    const fetchData = jest.fn().mockResolvedValue('test-data');
    const { result } = renderHook(() => useSWR('test-key', fetchData));

    // Wait for the data to be fetched
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.data).toBe('test-data');
    expect(fetchData).toHaveBeenCalledTimes(1);
  });
});
