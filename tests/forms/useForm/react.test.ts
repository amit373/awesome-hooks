import { act, renderHook } from '@testing-library/react';
import { useForm } from '../../../hooks/forms/useForm/react';

// Define types for the form
interface FormValues {
  name: string;
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

describe('useForm', () => {
  const initialValues: FormValues = { name: '', email: '' };
  const validationSchema = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) errors.email = 'Email is required';
    return errors;
  };

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useForm(initialValues));

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(true);
  });

  it('should handle field changes', () => {
    const { result } = renderHook(() => useForm(initialValues));

    const input = document.createElement('input');
    input.name = 'name';
    input.value = 'John Doe';

    const event: any = {
      target: input,
    };

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values.name).toBe('John Doe');
  });

  it('should validate on blur', async () => {
    const { result } = renderHook(() =>
      useForm(initialValues, validationSchema)
    );

    const input = document.createElement('input');
    input.name = 'name';
    input.value = '';

    const event: any = {
      target: input,
    };

    await act(async () => {
      await result.current.handleBlur(event);
    });

    expect(result.current.errors.name).toBe('Name is required');
    expect(result.current.isValid).toBe(false);
  });

  it('should submit valid form', async () => {
    const onSubmit = jest.fn();
    const validValues = { name: 'John', email: 'john@example.com' };
    const { result } = renderHook(() =>
      useForm(validValues, validationSchema, onSubmit)
    );

    const formEvent: any = {
      preventDefault: jest.fn(),
    };

    await act(async () => {
      await result.current.handleSubmit(formEvent);
    });

    expect(onSubmit).toHaveBeenCalledWith(validValues);
  });
});
