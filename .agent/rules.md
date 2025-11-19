# Pooply Project Rules

> Custom rules for Antigravity to follow when working on this project.

## TypeScript Standards

### Strict Type Safety

- **NEVER use `any` type** - Always use proper types, `unknown`, or generics
- **Prefer explicit return types** on functions for better documentation
- **Use strict mode** - Ensure `strict: true` in all `tsconfig.json` files
- **Avoid type assertions** unless absolutely necessary - Prefer type guards

### Type Patterns

```typescript
// ✅ GOOD - Explicit types
function getUser(id: string): Promise<User | null> {
  // ...
}

// ❌ BAD - Using any
function getUser(id: any): Promise<any> {
  // ...
}

// ✅ GOOD - Unknown for uncertain types
function parseJson(json: string): unknown {
  return JSON.parse(json);
}

// ✅ GOOD - Generics for flexibility
function fetchData<T>(url: string): Promise<T> {
  // ...
}
```

### Interface vs Type

- **Prefer `interface`** for object shapes (better error messages, extensible)
- **Use `type`** for unions, intersections, and utility types

---

## Code Style

### Naming Conventions

- **PascalCase** - Components, interfaces, types, classes
- **camelCase** - Variables, functions, methods
- **UPPER_SNAKE_CASE** - Constants and environment variables
- **kebab-case** - File names (except components: `UserProfile.tsx`)

### File Organization

```
src/
├── components/     # React components
│   ├── ui/        # Shadcn/UI components
│   └── features/  # Feature-specific components
├── lib/           # Utilities, helpers, shared logic
├── types/         # TypeScript type definitions
├── hooks/         # Custom React hooks
└── app/           # Next.js App Router pages
```

### Import Order

1. External dependencies (React, Next.js, etc.)
2. Internal absolute imports (`@/components`, `@/lib`)
3. Relative imports (`./`, `../`)
4. Type imports (use `import type` when possible)

```typescript
// ✅ GOOD
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "./utils";
import type { User } from "@/types";
```

---

## React & Next.js

### Component Patterns

- **Use functional components** with hooks (no class components)
- **Prefer named exports** for components (better for refactoring)
- **Use `"use client"` directive** only when necessary (default to Server Components)
- **Extract complex logic** into custom hooks

### Props & Types

```typescript
// ✅ GOOD - Explicit prop types
interface UserCardProps {
  user: User;
  onEdit?: (id: string) => void;
  className?: string;
}

export function UserCard({ user, onEdit, className }: UserCardProps) {
  // ...
}

// ❌ BAD - Inline types
export function UserCard({ user, onEdit }: { user: any; onEdit: any }) {
  // ...
}
```

### State Management

- **Use React Query** for server state (API data)
- **Use React hooks** for local component state
- **Avoid prop drilling** - Use composition or context when needed

---

## Backend (Express + Prisma)

### API Design

- **RESTful conventions** - Use proper HTTP methods (GET, POST, PUT, DELETE)
- **Consistent response format**:

  ```typescript
  // Success
  { success: true, data: T }

  // Error
  { success: false, error: { message: string, code?: string } }
  ```

- **Proper status codes** - 200, 201, 400, 401, 404, 500, etc.

### Error Handling

- **Always handle errors** - Use try/catch blocks
- **Use custom error classes** for different error types
- **Log errors** with context (user ID, request ID, etc.)
- **Never expose internal errors** to clients

### Database

- **Use Prisma Client** - Never write raw SQL unless absolutely necessary
- **Use transactions** for multi-step operations
- **Validate input** before database operations
- **Use proper indexes** for frequently queried fields

---

## Security

### Authentication & Authorization

- **Validate all inputs** - Never trust client data
- **Use Supabase Auth** for authentication
- **Check permissions** on every protected endpoint
- **Use environment variables** for secrets (never commit `.env`)

### Data Validation

- **Validate on backend** - Client validation is UX, not security
- **Sanitize user input** - Prevent XSS and injection attacks
- **Use Zod or similar** for runtime type validation

---

## Performance

### Frontend

- **Lazy load components** when appropriate (`next/dynamic`)
- **Optimize images** - Use Next.js `<Image>` component
- **Minimize bundle size** - Check imports, use tree-shaking
- **Use React.memo** sparingly - Only when profiling shows benefit

### Backend

- **Use database indexes** for common queries
- **Implement pagination** for list endpoints
- **Cache when appropriate** - But avoid premature optimization
- **Use connection pooling** for database connections

---

## Testing (When Implemented)

### Coverage Goals

- **Critical paths** - Auth, payment, data integrity
- **Edge cases** - Empty states, errors, loading states
- **Integration tests** over unit tests when possible

### Testing Patterns

- **Arrange, Act, Assert** - Clear test structure
- **Descriptive test names** - `it("should return 401 when user is not authenticated")`
- **Mock external dependencies** - APIs, databases, etc.

---

## Git & Version Control

### Commit Messages

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: add Bristol scale selector to poop logging form`

### Branching

- `master` - Production-ready code
- `develop` - Integration branch (if needed)
- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes

---

## Documentation

### Code Comments

- **Explain WHY, not WHAT** - Code should be self-documenting
- **Document complex logic** - Algorithms, business rules
- **Use JSDoc** for public APIs and complex functions
- **Keep comments up-to-date** - Outdated comments are worse than no comments

### README & Docs

- **Keep PROJECT_STATUS.md updated** - Track progress
- **Document setup steps** - For new developers
- **Document environment variables** - What they're for
- **Update API docs** - Keep Swagger in sync

---

## Accessibility

### Web App

- **Semantic HTML** - Use proper elements (`<button>`, `<nav>`, etc.)
- **ARIA labels** - When semantic HTML isn't enough
- **Keyboard navigation** - All interactive elements accessible via keyboard
- **Color contrast** - Meet WCAG AA standards (Shadcn/UI helps with this)

---

## Mobile-First Design

### Responsive Breakpoints

- **Start with mobile** - Base styles for mobile, enhance for larger screens
- **Use Tailwind breakpoints**: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- **Test on real devices** - Not just browser DevTools
- **Touch targets** - Minimum 44x44px for interactive elements

---

## Project-Specific Rules

### Pooply Domain

- **Bristol Scale** - Always validate 1-7 range
- **Timestamps** - Store in UTC, display in user's timezone
- **Privacy** - Health data is sensitive, handle with care
- **Gamification** - Keep it fun but not annoying

### Dummy Data

- **Use realistic data** - Helps with testing and demos
- **Keep in `src/lib/dummyData.ts`** - Centralized location
- **Mark clearly** - So it's easy to remove later

---

## When in Doubt

1. **Prioritize type safety** - Better to be explicit than flexible
2. **Follow existing patterns** - Consistency over personal preference
3. **Ask for clarification** - Don't assume requirements
4. **Document decisions** - Especially non-obvious ones
5. **Keep it simple** - YAGNI (You Aren't Gonna Need It)

---

**Last Updated:** 2025-11-19  
**Maintained by:** Project team
