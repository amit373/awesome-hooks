# useSWR

React hook for data fetching with SWR (stale-while-revalidate) strategy. Implements the stale-while-revalidate caching pattern for optimal user experience with fresh data.

## Features

- Stale-while-revalidate caching strategy
- Automatic revalidation with configurable intervals
- Deduplication of requests
- Error handling and loading states
- Manual mutation capability
- SSR-safe implementation

## Installation

```bash
npm install # or your package manager of choice
```

## Usage

```typescript
import { useSWR } from './hooks/data-async/useSWR';

const UserProfile = ({ userId }) => {
  const { data, error, isValidating, mutate } = useSWR(
    `/api/users/${userId}`,
    async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    { refreshInterval: 30000 } // Optional: auto-refresh every 30 seconds
  );

  if (error) return <div>Error loading user</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
      {isValidating && <span>Updating...</span>}
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
};
```

## API

### Arguments

- `key` (string): Unique cache key for the data
- `fetcher` (Function): Async function that returns a promise with the data
- `options` (Object, optional): Configuration options
  - `refreshInterval` (number): Auto-refresh interval in milliseconds
  - `dedupingInterval` (number): Request deduplication interval
  - `onSuccess` (Function): Callback when fetch succeeds
  - `onError` (Function): Callback when fetch fails

### Return Values

- `data` (any): Fetched data or undefined
- `error` (Error | null): Error object if fetch failed
- `isValidating` (boolean): True when revalidating
- `mutate` (Function): Function to manually trigger refetch or update data

## Browser Compatibility

- Chrome 5+
- Firefox 4+
- Safari 4+
- Edge 12+
- Opera 11.5+

## License

MIT
