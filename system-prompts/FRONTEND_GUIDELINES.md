# FRONTEND_GUIDELINES.md

## Purpose

This document defines the mandatory rules for generating the React frontend of an AI hackathon application.

The frontend must be:
- Modular
- Type-safe
- Responsive
- API-ready
- Easy for a hackathon team to understand and extend
- Able to display AI answers, relevance, confidence, sources, and citations

The frontend must integrate with a Python FastAPI backend through a clearly defined REST API.

## Technology Stack

Use the following stack:

- React 18 or later
- TypeScript
- Vite
- React Router
- Tailwind CSS or CSS Modules
- TanStack Query, optional
- Zod, optional, for API response validation
- Vitest and React Testing Library, optional

Keep dependencies minimal. Do not add unnecessary state-management libraries unless the problem statement requires complex global state.

## Core Principles

1. Build the UI using reusable components.
2. Keep components small and focused on one responsibility.
3. Separate UI, business logic, API calls, types, and utilities.
4. Use TypeScript for all application code.
5. Use environment variables for configuration.
6. Never hard-code API keys, tokens, or backend URLs.
7. Always handle loading, empty, error, and success states.
8. Make the UI accessible and responsive.
9. Use clear naming and folder organization.
10. Add placeholders for problem-specific API integrations.

React components should represent pieces of the UI and data model, and state should be managed with hooks such as `useState` when needed. [17][19]

## Required Folder Structure

Create the following frontend structure:

```text
frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   └── providers/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── TextArea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Tooltip.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Footer.tsx
│   │       └── PageContainer.tsx
│   ├── features/
│   │   └── <problem-feature>/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       ├── types.ts
│   │       └── index.ts
│   ├── services/
│   │   ├── apiClient.ts
│   │   └── endpoints.ts
│   ├── hooks/
│   │   ├── useApi.ts
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── types/
│   │   ├── api.ts
│   │   └── common.ts
│   ├── utils/
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── cn.ts
│   ├── constants/
│   │   ├── routes.ts
│   │   ├── config.ts
│   │   └── messages.ts
│   └── styles/
│       └── index.css
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

Replace `<problem-feature>` with the actual domain feature, for example:

- `document-search`
- `customer-support`
- `policy-assistant`
- `knowledge-chat`
- `resume-screening`
- `incident-triage`

## Environment Variables

Create `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Hackathon AI App
VITE_ENABLE_MOCK_API=true
```

Rules:

- All frontend environment variables must begin with `VITE_`.
- Never commit `.env`.
- Never expose secret API keys in frontend code.
- Use fallback values only for local development.
- Keep backend URL configurable.

## API Client

Create a central API client in `src/services/apiClient.ts`.

```ts
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    let errorDetails: unknown;

    try {
      const errorBody = await response.json();
      errorMessage = errorBody?.error?.message ?? errorMessage;
      errorDetails = errorBody?.error?.details;
    } catch {
      // Keep default error message
    }

    throw new ApiError(response.status, errorMessage, errorDetails);
  }

  return response.json() as Promise<T>;
}
```

## API Service Pattern

Create one service file per feature.

```ts
// src/features/knowledge-chat/services/chatApi.ts
import { apiRequest } from "@/services/apiClient";
import type { AskRequest, AskResponse } from "../types";

export async function askQuestion(
  payload: AskRequest
): Promise<AskResponse> {
  return apiRequest<AskResponse>("/api/v1/ask", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
```

Rules:

- Do not call `fetch` directly inside components.
- Keep all API calls in service modules.
- Use TypeScript interfaces for every request and response.
- Use one API endpoint per service function.
- Add TODO comments where the backend endpoint is not yet finalized.

Example placeholder:

```ts
// TODO: Replace with the actual problem-specific endpoint.
export async function submitProblemData(payload: unknown) {
  return apiRequest("/api/v1/problem/submit", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
```

## TypeScript Types

Create API types in `src/types/api.ts`.

```ts
export interface Citation {
  chunk_id: string;
  document_id: string;
  title: string;
  source_url?: string | null;
  section?: string | null;
  snippet: string;
  relevance_score: number;
}

export interface AskRequest {
  question: string;
  top_k?: number;
  filters?: Record<string, string>;
}

export interface AskResponse {
  answer: string;
  confidence: number;
  grounded: boolean;
  citations: Citation[];
  guardrail_status: string;
  warnings: string[];
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
```

## Component Standards

Use these rules for all components:

- Use function components.
- Use TypeScript props interfaces.
- Use `PascalCase` for component names.
- Use `camelCase` for variables, functions, and props.
- Use `use` prefix for custom hooks.
- Avoid business logic inside components.
- Extract reusable logic into custom hooks.
- Avoid deeply nested JSX.
- Use semantic HTML elements.
- Add accessible labels to form controls.
- Use `key` props correctly in lists.
- Avoid inline styles except for dynamic styling.
- Do not mutate props or state directly.

Example component:

```tsx
interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn--${variant}`}
    >
      {loading ? "Loading..." : label}
    </button>
  );
}
```

## State Management

Use local component state by default.

Use React hooks such as:

- `useState` for local UI state
- `useEffect` for side effects
- `useMemo` for expensive derived values
- `useCallback` for stable function references
- Custom hooks for reusable logic

Rules:

- Do not use Redux, Zustand, or MobX unless necessary.
- Keep server data in query/cache state when using TanStack Query.
- Do not duplicate backend state in multiple components.
- Keep forms controlled.
- Avoid prop drilling beyond two or three levels.

## Required UI States

Every data-driven screen must support:

1. `idle`
2. `loading`
3. `success`
4. `empty`
5. `error`

Example:

```tsx
if (isLoading) {
  return <Loader />;
}

if (error) {
  return <ErrorState message="Unable to load results." />;
}

if (!data || data.length === 0) {
  return <EmptyState message="No results found." />;
}

return <ResultsList data={data} />;
```

## AI Answer Display

For every AI-generated response, display:

- The generated answer
- Confidence or relevance score
- Whether the answer is grounded in retrieved sources
- Source citations
- Guardrail status
- Warnings
- Feedback controls: helpful or not helpful
- Optional follow-up questions

Create a reusable component:

```text
src/features/<problem-feature>/components/AnswerCard.tsx
```

It must display:

```text
Answer
Confidence: 87%
Grounded: Yes
Sources:
- Refund Policy — Refund Window — relevance 0.87
Warnings:
- No relevant sources met the relevance threshold.
```

## Citation Display

Each citation must show:

- Document title
- Section, if available
- Source URL or document reference
- Chunk ID
- Relevance score
- Short snippet

If no citations are available, show:

```text
No reliable sources were found for this answer.
```

The frontend must never fabricate citations. It must render only citations returned by the backend.

## Required Screens

Generate these screens unless the problem statement requires a different flow:

1. Home or problem overview
2. Main interaction screen
3. Results or answer screen
4. Document upload or data source screen
5. Settings or configuration screen
6. Error page
7. Not Found page

The main interaction screen may be:

- Chat interface
- Search interface
- Form-based workflow
- Dashboard
- File upload interface
- Decision-support interface

## Routing

Use React Router.

```ts
export const routes = {
  home: "/",
  chat: "/chat",
  results: "/results",
  upload: "/upload",
  settings: "/settings",
  notFound: "*",
};
```

Rules:

- Use nested routes where appropriate.
- Use lazy loading for large pages.
- Add a 404 route.
- Protect routes only if authentication is required by the problem statement.

## Styling

Use Tailwind CSS or CSS Modules.

Rules:

- Use a consistent spacing scale.
- Use a consistent color palette.
- Use responsive breakpoints.
- Avoid overly complex CSS.
- Create reusable UI components for repeated patterns.
- Support mobile, tablet, and desktop layouts.
- Ensure sufficient color contrast.

## Accessibility

Follow these rules:

- Use semantic HTML.
- Add labels to all inputs.
- Use `alt` text for meaningful images.
- Ensure keyboard navigation.
- Use focus states.
- Avoid color-only status indicators.
- Use `aria-live` for important async updates where appropriate.
- Maintain sufficient contrast.

## Error Handling

Create an error boundary:

```text
src/app/ErrorBoundary.tsx
```

Rules:

- Show a user-friendly error message.
- Log technical details to the console during development.
- Provide a retry action where appropriate.
- Do not expose stack traces to end users in production.

## Mock API Support

For local demos, create a mock service fallback.

```text
src/services/mockApi.ts
```

Rules:

- Enable mock API using `VITE_ENABLE_MOCK_API=true`.
- Return realistic sample responses.
- Include sample citations and relevance scores.
- Do not use mock data in production paths.
- Clearly label mock responses in the UI if needed.

## Testing

Generate basic tests for:

- API client error handling
- Critical utility functions
- Key UI components
- Main feature workflow

Use Vitest and React Testing Library.

Example test locations:

```text
src/services/apiClient.test.ts
src/utils/format.test.ts
src/features/<problem-feature>/components/AnswerCard.test.tsx
```

## README Requirements

The frontend `README.md` must include:

- Project overview
- Tech stack
- Setup instructions
- Environment variables
- Available scripts
- Folder structure
- API integration guide
- Mock API instructions
- Known limitations
- Hackathon demo instructions

## Frontend Acceptance Checklist

Before completion, verify:

- [ ] `npm install` works
- [ ] `npm run dev` works
- [ ] TypeScript compiles without errors
- [ ] No unused dependencies
- [ ] No hardcoded backend URL
- [ ] No API keys in code
- [ ] All API calls use service modules
- [ ] All screens handle loading, error, empty, and success states
- [ ] AI answers display citations and confidence
- [ ] UI is responsive
- [ ] Basic accessibility is implemented
- [ ] README is complete
