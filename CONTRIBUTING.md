# Contributing to @tri-hooks/library

Thank you for your interest in contributing to @tri-hooks/library! We're excited to work with the community to build a comprehensive, tree-shakable hooks library for React, Vue, and Angular.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/tri-hooks.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/my-feature`

## 📋 Code Contributions

### Adding a New Hook

To add a new hook, follow this structure:

```
hooks/
  /category/
    /hookName/
      react.ts        # React implementation
      vue.ts          # Vue 3 implementation
      angular.ts      # Angular implementation
      react.test.ts   # React tests
      vue.test.ts     # Vue tests
      angular.spec.ts # Angular tests
      README.md       # Documentation
```

### Hook Implementation Guidelines

#### React Hooks

- Use functional hooks only
- Follow TypeScript strict mode
- Implement proper cleanup with useEffect
- Use useCallback/useMemo for performance
- Export with descriptive return types

#### Vue 3 Composables

- Use Composition API
- Leverage ref, computed, watch appropriately
- Clean up with onUnmounted
- Follow Vue 3 best practices

#### Angular Services

- Use Signals-first approach
- Only use RxJS when needed for continuous streams
- Implement proper cleanup
- Make public API available via Signals

### Testing Requirements

Every hook must include tests covering:

- Initialization
- Normal usage
- Edge cases
- Cleanup behavior
- Error handling

## 🧪 Running Tests

```bash
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test -- --coverage # Run tests with coverage
```

## 🔧 Development Scripts

- `npm run dev` - Watch mode for development
- `npm run build` - Build the library
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## 📝 Documentation

Each hook must include comprehensive documentation in its README.md file:

- Clear description and use cases
- Installation instructions
- Usage examples for all frameworks
- API documentation
- Browser compatibility
- Performance considerations

## 🚩 Pull Request Process

1. Create a descriptive pull request title
2. Include a detailed description of changes
3. Add/update tests as needed
4. Update documentation
5. Ensure all tests pass
6. Link any related issues

## 🐛 Reporting Issues

When reporting issues, please include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, browser, Node version)
- Code examples if applicable

## 🌟 Best Practices

- Write clean, readable code
- Follow existing code patterns
- Maintain consistent API across frameworks
- Prioritize performance and memory efficiency
- Handle edge cases gracefully
- Include proper TypeScript types

## 📞 Questions?

If you have any questions, feel free to open an issue or contact the maintainers.

Thank you for contributing!
