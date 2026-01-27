# Contributing to Indian Artisans Marketplace

Thank you for your interest in contributing to the Indian Artisans Marketplace platform! This guide will help you get started.

## 📋 Table of Contents

- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## 🚀 Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or pnpm

### Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd indian_artisans

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Set up database
npm run db:generate
npm run db:migrate

# Start development server
npm run dev
```

## 🎨 Code Style

We use automated tools to maintain consistent code quality:

### Formatting

- **Prettier** for code formatting
- **ESLint** for code linting
- Automatic formatting on save (recommended VS Code extension)

```bash
# Format all files
npm run format

# Check formatting
npm run format:check

# Fix linting issues
npm run lint:fix
```

### TypeScript

- Use TypeScript for all new code
- Enable strict mode (already configured)
- Avoid `any` types - use proper typing
- Run type checking before committing

```bash
npm run typecheck
```

### Code Quality Rules

1. **No unused variables or imports** - TypeScript will error
2. **Consistent naming**:
   - Components: `PascalCase`
   - Functions/variables: `camelCase`
   - Constants: `UPPER_SNAKE_CASE`
   - Files: `kebab-case` or `PascalCase` for components
3. **Single responsibility** - Keep functions and components focused
4. **DRY principle** - Don't repeat yourself
5. **Meaningful names** - Use descriptive variable and function names

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring (no functional changes)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or dependency changes
- `ci`: CI/CD configuration changes
- `chore`: Other changes (maintenance, etc.)

### Examples

```bash
# Good commit messages
feat(products): add AI-powered product search
fix(payment): resolve Razorpay webhook timeout issue
docs(readme): update installation instructions
refactor(auth): simplify user authentication logic
test(products): add unit tests for product validation

# Bad commit messages (will be rejected)
update code
fix bug
WIP
asdfgh
```

### Scope Guidelines

Use the feature or module name as scope:

- `products`, `orders`, `payment`, `auth`, `artisans`
- `ui`, `api`, `database`, `config`
- `whatsapp`, `ai`, `razorpay`

## 🧪 Testing

We use **Vitest** for testing. Write tests for:

- New features
- Bug fixes
- Critical business logic
- API endpoints
- Utility functions

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Writing Tests

```typescript
// lib/__tests__/my-utility.test.ts
import { describe, it, expect } from 'vitest';
import { myUtility } from '../my-utility';

describe('myUtility', () => {
  it('should do something correctly', () => {
    expect(myUtility('input')).toBe('expected output');
  });
});
```

```typescript
// components/__tests__/MyComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Test Coverage

- Aim for at least 70% coverage for new code
- Critical paths (payment, auth) should have 90%+ coverage
- Run `npm run test:coverage` to check coverage

## 🔄 Pull Request Process

### Before Submitting

1. **Update from main branch**

   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```

2. **Run all checks**

   ```bash
   npm run typecheck
   npm run lint
   npm run test
   npm run format:check
   ```

3. **Test locally**
   - Verify the feature works as expected
   - Test edge cases
   - Check for console errors

### PR Guidelines

1. **Title**: Use conventional commit format
   - Example: `feat(products): add bulk upload feature`

2. **Description**: Include:
   - What changed and why
   - How to test the changes
   - Screenshots (for UI changes)
   - Breaking changes (if any)

3. **Size**: Keep PRs focused and reasonably sized
   - Prefer smaller, focused PRs over large ones
   - Split large features into multiple PRs

4. **Review**: Address all review comments
   - Respond to feedback constructively
   - Make requested changes or explain why not

### PR Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Type checking passes
- [ ] Documentation updated (if needed)
- [ ] No console errors or warnings
- [ ] Conventional commit format used

## 🔧 Git Hooks

We use **Husky** for automated checks:

### Pre-commit Hook

Automatically runs on `git commit`:

- Formats staged files with Prettier
- Lints staged files with ESLint
- Runs type checking

### Commit-msg Hook

Validates commit message format:

- Ensures conventional commit format
- Rejects invalid commit messages

### Skipping Hooks

Only in emergencies:

```bash
git commit --no-verify -m "emergency fix"
```

## 💡 Best Practices

### Component Structure

```typescript
// Good component structure
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MyComponentProps {
  title: string;
  onSubmit: () => void;
}

export function MyComponent({ title, onSubmit }: MyComponentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleSubmit} disabled={isLoading}>
        Submit
      </Button>
    </div>
  );
}
```

### API Route Structure

```typescript
// app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.myModel.findMany();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch data' }, { status: 500 });
  }
}
```

### Error Handling

```typescript
// Always handle errors gracefully
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  console.error('Operation failed:', error);
  // Log to error tracking service (e.g., Sentry)
  return { success: false, error: 'Operation failed' };
}
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🆘 Getting Help

- Check existing documentation in the repo
- Search existing issues
- Ask in team chat/discussions
- Create a new issue with detailed information

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Indian Artisans Marketplace! 🎨
