import { useState, useMemo } from 'react';

export function useQueryParams() {
  const getParams = () => {
    const params = new URLSearchParams(window.location.search);
    const res: Record<string, string> = {};
    params.forEach((value, key) => {
      res[key] = value;
    });
    return res;
  };

  const [query, setQuery] = useState(getParams());

  // Note: This implementation is basic. For a real app, integrate with your router (React Router, etc.)
  // or listen to popstate events if you are doing manual routing.
  
  return query;
}
