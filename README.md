## Setup

```bash
npm install
```

```bash
npm run dev
```

### Or separately

<u>Backend</u>

```bash
cd packages/backend && npm install
```

```bash
npm run dev
```

<u>Frontend</u>

```bash
cd packages/frontend && npm install
```

```bash
npm run dev
```

## Improvements

- Decide whether to keep the main project as a monorepo or separate repositories based on a few factors such as Team structure and Resources.
- Continuous Integration depending on services chosen.
- Backend:
  - Use a module per feature approach for better scalability. Each module will have its own controllers, services, etc
  - Use a 3rd party library for Dependency injection such as Inversify.
- Frontend:
  - Use of a state management library such as Redux, Zustand, etc
    - Improve loading state management
    - Improve performance. E.g. only loading data once and reference it via multiple components, reducing re-renders
    - Improve error handling
  - Use a library such as axios to handle use of API
  - More research on how to utilise HighCharts' config effectively in React is required
  - Improve defensive programming and validation
