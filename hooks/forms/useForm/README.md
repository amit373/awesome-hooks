# useForm

A comprehensive form management hook that provides state management, validation, and submission handling for React, Vue, and Angular. Handles form state, validation, and submission with a simple API that works across all major frameworks.

## Features

- **Complete form management**: State, validation, and submission handling
- **Cross-framework support**: Available for React, Vue 3, and Angular
- **Tree-shakable**: Only import what you need
- **SSR-friendly**: Safe to use in server-side rendered applications
- **Built-in validation**: Supports synchronous and asynchronous validation
- **Error handling**: Automatic error management and display
- **TypeScript ready**: Fully typed with proper type inference

## Installation

```bash
npm install your-hooks-library
```

## Usage

### React
```tsx
import { useForm } from 'your-hooks-library/react';

function ContactForm() {
  const validationSchema = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) errors.email = 'Email is required';
    if (!values.message) errors.message = 'Message is required';
    return errors;
  };

  const { values, errors, handleChange, handleBlur, handleSubmit, isValid } = useForm(
    { name: '', email: '', message: '' },
    validationSchema,
    async (formData) => {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Name"
      />
      {errors.name && <div className="error">{errors.name}</div>}
      
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email"
      />
      {errors.email && <div className="error">{errors.email}</div>}
      
      <textarea
        name="message"
        value={values.message}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Message"
      />
      {errors.message && <div className="error">{errors.message}</div>}
      
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
```

### Vue 3
```vue
<script setup>
import { useForm } from 'your-hooks-library/vue';

const validationSchema = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'Name is required';
  if (!values.email) errors.email = 'Email is required';
  if (!values.message) errors.message = 'Message is required';
  return errors;
};

const { values, errors, handleChange, handleBlur, handleSubmit, isValid } = useForm(
  { name: '', email: '', message: '' },
  validationSchema,
  async (formData) => {
    // Handle form submission
    console.log('Form submitted:', formData);
  }
);
</script>

<template>
  <form @submit="handleSubmit">
    <input
      name="name"
      :value="values.value.name"
      @input="handleChange"
      @blur="handleBlur"
      placeholder="Name"
    />
    <div v-if="errors.value.name" class="error">{{ errors.value.name }}</div>
    
    <input
      name="email"
      :value="values.value.email"
      @input="handleChange"
      @blur="handleBlur"
      placeholder="Email"
    />
    <div v-if="errors.value.email" class="error">{{ errors.value.email }}</div>
    
    <textarea
      name="message"
      :value="values.value.message"
      @input="handleChange"
      @blur="handleBlur"
      placeholder="Message"
    />
    <div v-if="errors.value.message" class="error">{{ errors.value.message }}</div>
    
    <button type="submit" :disabled="!isValid">
      Submit
    </button>
  </form>
</template>
```

### Angular
```typescript
import { Component } from '@angular/core';
import { FormService } from 'your-hooks-library/angular';

@Component({
  template: `
    <form (ngSubmit)="handleSubmit($event)">
      <input
        name="name"
        [value]="formState.values.name"
        (input)="handleChange($event)"
        (blur)="handleBlur($event)"
        placeholder="Name"
      />
      <div *ngIf="formState.errors.name" class="error">
        {{ formState.errors.name }}
      </div>
      
      <input
        name="email"
        [value]="formState.values.email"
        (input)="handleChange($event)"
        (blur)="handleBlur($event)"
        placeholder="Email"
      />
      <div *ngIf="formState.errors.email" class="error">
        {{ formState.errors.email }}
      </div>
      
      <textarea
        name="message"
        [value]="formState.values.message"
        (input)="handleChange($event)"
        (blur)="handleBlur($event)"
        placeholder="Message"
      />
      <div *ngIf="formState.errors.message" class="error">
        {{ formState.errors.message }}
      </div>
      
      <button type="submit" [disabled]="!formState.isValid">
        Submit
      </button>
    </form>
  `
})
export class ContactFormComponent {
  private formService = new FormService();
  
  formState = this.formService.useForm(
    { name: '', email: '', message: '' },
    (values) => {
      const errors: any = {};
      if (!values.name) errors.name = 'Name is required';
      if (!values.email) errors.email = 'Email is required';
      if (!values.message) errors.message = 'Message is required';
      return errors;
    },
    async (formData) => {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  );
  
  handleChange = this.formState.handleChange;
  handleBlur = this.formState.handleBlur;
  handleSubmit = this.formState.handleSubmit;
}
```

## API

### Parameters

- `initialValues` (Object): Initial form values
- `validationSchema` (Function, optional): Validation function that receives form values and returns errors
- `onSubmit` (Function, optional): Submission handler function

### Return Value

Returns an object with:

- `values` (Object): Current form values
- `errors` (Object): Current form errors
- `handleChange` (Function): Handler for input changes
- `handleBlur` (Function): Handler for input blur events (triggers validation)
- `handleSubmit` (Function): Handler for form submission
- `setFieldValue` (Function): Programmatically set a field value
- `setFieldError` (Function): Programmatically set a field error
- `resetForm` (Function): Reset form to initial state
- `isValid` (boolean): Whether the form is valid

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## License

MIT