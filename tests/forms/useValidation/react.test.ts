import { act, renderHook } from '@testing-library/react';
import { useValidation } from '../../../hooks/forms/useValidation/react';

interface FormValues {
  name: string;
  email: string;
}

describe('useValidation', () => {
  it('should initialize with correct default values', () => {
    const initialValues: FormValues = { name: '', email: '' };
    const validationRules = {
      name: (val: string) =>
        val.length < 2 ? 'Name must be at least 2 characters' : undefined,
      email: (val: string) =>
        !val.includes('@') ? 'Invalid email' : undefined,
    };

    const { result } = renderHook(() =>
      useValidation(initialValues, validationRules)
    );

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(true);
  });

  it('should validate fields correctly', () => {
    const initialValues: FormValues = { name: 'J', email: 'invalid' };
    const validationRules = {
      name: (val: string) =>
        val.length < 2 ? 'Name must be at least 2 characters' : undefined,
      email: (val: string) =>
        !val.includes('@') ? 'Invalid email' : undefined,
    };

    const { result } = renderHook(() =>
      useValidation(initialValues, validationRules)
    );

    act(() => {
      result.current.validate();
    });

    expect(result.current.errors.name).toBe(
      'Name must be at least 2 characters'
    );
    expect(result.current.errors.email).toBe('Invalid email');
    expect(result.current.isValid).toBe(false);
  });

  it('should handle field changes', () => {
    const initialValues: FormValues = { name: '', email: '' };
    const validationRules = {
      name: (val: string) =>
        val.length < 2 ? 'Name must be at least 2 characters' : undefined,
      email: (val: string) =>
        !val.includes('@') ? 'Invalid email' : undefined,
    };

    const { result } = renderHook(() =>
      useValidation(initialValues, validationRules)
    );

    act(() => {
      result.current.handleChange('name', 'John');
    });

    expect(result.current.values.name).toBe('John');
  });

  it('should reset form', () => {
    const initialValues: FormValues = {
      name: 'John',
      email: 'john@example.com',
    };
    const validationRules = {
      name: (val: string) =>
        val.length < 2 ? 'Name must be at least 2 characters' : undefined,
      email: (val: string) =>
        !val.includes('@') ? 'Invalid email' : undefined,
    };

    const { result } = renderHook(() =>
      useValidation(initialValues, validationRules)
    );

    act(() => {
      result.current.handleChange('name', 'Invalid');
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });
});
