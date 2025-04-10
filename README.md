# MetaTask

A canvas-based simulation built with React, TypeScript, and PixiJS.

## Features

- Canvas rendering system using PixiJS
- Character movement system
- Collision detection
- House layout visualization
- Career data structure representation
- Interactive information panels

## Tech Stack

- React 18
- TypeScript
- Vite (build tool)
- PixiJS (canvas rendering)
- Mantine UI (component library)

## Project Structure

```
src/
  ├── assets/         # Static assets like images, fonts
  ├── components/     # Reusable React components
  ├── hooks/          # Custom React hooks
  ├── providers/      # Context providers
  ├── utils/          # Utility functions and helpers
  ├── App.tsx         # Main application component
  └── main.tsx        # Application entry point
```

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser at http://localhost:5173

### Build for Production

```
npm run build
```

## Code Quality

This project uses ESLint and Prettier for code quality and formatting:

- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
