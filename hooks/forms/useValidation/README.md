# useValidation

React hook for form field validation. Provides an easy way to validate form inputs with custom validation rules and track validation state.

## Features

- Custom validation rules
- Real-time validation feedback
- Error message handling
- Form state management
- Validation reset capability
- Type-safe validation

## Installation

```bash
npm install # or your package manager of choice
```

## Usage

```typescript
import { useValidation } from './hooks/forms/useValidation';

const EmailInput = () => {
  const emailValidation = useValidation('', {
    required: (value) => value.trim() !== '' || 'Email is required',
    emailFormat: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format',
    minLength: (value) => value.length >= 5 || 'Email must be at least 5 characters'
  });

  return (
    <div>
      <input
        type="email"
        value={emailValidation.value}
        onChange={(e) => emailValidation.setValue(e.target.value)}
        onBlur={emailValidation.validate}
        style={{ borderColor: emailValidation.isValid ? 'green' : 'red' }}
      />

      {!emailValidation.isValid && (
        <div style={{ color: 'red' }}>
          {Object.values(emailValidation.errors).map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      )}

      <button
        onClick={emailValidation.validate}
        disabled={emailValidation.isValid}
      >
        Validate
      </button>

      <button onClick={emailValidation.reset}>
        Reset
      </button>
    </div>
  );
};

// Advanced usage with complex validation
const RegistrationForm = () => {
  const username = useValidation('', {
    required: (val) => val.trim() !== '',
    minLength: (val) => val.length >= 3 || 'Username must be at least 3 characters',
    noSpecialChars: (val) => /^[a-zA-Z0-9_]*$/.test(val) || 'Only letters, numbers, and underscores allowed'
  });

  const password = useValidation('', {
    required: (val) => val !== '',
    minLength: (val) => val.length >= 8 || 'Password must be at least 8 characters',
    hasNumber: (val) => /\d/.test(val) || 'Password must contain at least one number',
    hasUpper: (val) => /[A-Z]/.test(val) || 'Password must contain at least one uppercase letter'
  });

  const confirmPassword = useValidation('', {
    matchesPassword: (val) => val === password.value || 'Passwords do not match'
  });

  const handleSubmit = () => {
    const isUsernameValid = username.validate();
    const isPasswordValid = password.validate();
    const isConfirmValid = confirmPassword.validate();

    if (isUsernameValid && isPasswordValid && isConfirmValid) {
      // Submit form
      console.log('Form is valid!', {
        username: username.value,
        password: password.value
      });
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div>
        <input
          placeholder="Username"
          value={username.value}
          onChange={(e) => username.setValue(e.target.value)}
          onBlur={username.validate}
        />
        {username.errors.required && <span>Username is required</span>}
        {username.errors.minLength && <span>{username.errors.minLength}</span>}
        {username.errors.noSpecialChars && <span>{username.errors.noSpecialChars}</span>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password.value}
          onChange={(e) => password.setValue(e.target.value)}
          onBlur={password.validate}
        />
        {password.errors.required && <span>Password is required</span>}
        {password.errors.minLength && <span>{password.errors.minLength}</span>}
        {password.errors.hasNumber && <span>{password.errors.hasNumber}</span>}
        {password.errors.hasUpper && <span>{password.errors.hasUpper}</span>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword.value}
          onChange={(e) => confirmPassword.setValue(e.target.value)}
          onBlur={confirmPassword.validate}
        />
        {confirmPassword.errors.matchesPassword && <span>{confirmPassword.errors.matchesPassword}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};
```

## API

### Arguments

- `initialValue` (any): Initial value for the field
- `rules` (object): Validation rules to apply
  - Keys are rule names
  - Values are validation functions that accept the field value and return either:
    - `true` if validation passes
    - `false` if validation fails (uses default error message)
    - A string error message if validation fails

### Return Values

- `value` (any): Current field value
- `setValue` (function): Function to update the field value
- `errors` (object): Object containing validation errors by rule name
- `isValid` (boolean): True if all validations pass
- `validate` (function): Function to manually trigger validation
- `reset` (function): Function to reset value and errors to initial state

## Validation Rules

Validation functions should return:

- `true` if the validation passes
- `false` if it fails (will show default error message)
- A string with a custom error message if it fails

## Common Validation Patterns

- Required field: `(value) => value.trim() !== '' || 'Field is required'`
- Email format: `(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email'`
- Minimum length: `(value) => value.length >= 8 || 'Must be at least 8 characters'`
- Pattern matching: `(value) => /^\d+$/.test(value) || 'Only numbers allowed'`
- Value comparison: `(value) => value === otherValue || 'Values do not match'`

## License

MIT
