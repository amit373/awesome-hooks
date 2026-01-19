import { useAuth } from '../useAuth/react';

// A simple helper to get specific profile fields or the whole object
export function useUserProfile<T = any>() {
  const { user } = useAuth();
  return user as T | null;
}
