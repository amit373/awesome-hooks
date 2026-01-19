import { useState, useEffect } from 'react';

type Validator<T> = (value: T) => string | null;

export function useValidation<T>(value: T, validators: Validator<T>[]) {
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    for (const validator of validators) {
      const err = validator(value);
      if (err) {
        setError(err);
        setIsValid(false);
        return;
      }
    }
    setError(null);
    setIsValid(true);
  }, [value, validators]);

  return { error, isValid };
}
