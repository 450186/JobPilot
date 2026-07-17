# JobPilot

JobPilot is a full-stack job application tracker designed to help users organise, monitor and manage their job search.

The project is being built as a portfolio piece to demonstrate TypeScript, React, Node.js, Express and PostgreSQL in a real-world application.

## Features

- Track job applications
- Store company, role, location, salary, status, deadline and notes
- View all saved applications
- Add new applications through an API
- PostgreSQL database integration
- REST API built with Express and TypeScript

## Tech Stack

### Frontend
- React
- TypeScript

### Backend
- Node.js
- Express
- TypeScript

### Database
- PostgreSQL

### Tools
- Git
- npm
- dotenv
- ts-node-dev

## Project Structure


```
JobPilot
├─ README.md
├─ client
│  ├─ README.md
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.svg
│  │  └─ icons.svg
│  ├─ src
│  │  ├─ App.tsx
│  │  ├─ api
│  │  │  ├─ applications.ts
│  │  │  └─ auth.ts
│  │  ├─ components
│  │  │  ├─ ApplicationForm.tsx
│  │  │  ├─ ApplicationFormModal.tsx
│  │  │  ├─ ApplicationModal.tsx
│  │  │  ├─ ApplicationTable.tsx
│  │  │  ├─ ApplicationTimeline.tsx
│  │  │  ├─ EmptyState.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  └─ statusBadge.tsx
│  │  ├─ main.tsx
│  │  ├─ pages
│  │  │  ├─ Applications.tsx
│  │  │  ├─ Dashboard.tsx
│  │  │  ├─ Login.tsx
│  │  │  └─ Register.tsx
│  │  ├─ styles
│  │  │  ├─ badges.css
│  │  │  ├─ dashboard.css
│  │  │  ├─ forms.css
│  │  │  ├─ globals.css
│  │  │  ├─ navbar.css
│  │  │  └─ table.css
│  │  ├─ types
│  │  │  └─ Application.ts
│  │  └─ utils
│  │     ├─ deadlineClass.ts
│  │     ├─ deadlineText.ts
│  │     ├─ formatDate.ts
│  │     └─ formatRelativeDates.ts
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
└─ server
   ├─ package-lock.json
   ├─ package.json
   ├─ src
   │  ├─ db.ts
   │  ├─ index.ts
   │  ├─ middleware
   │  │  └─ authMiddleware.ts
   │  └─ types
   │     └─ Application.ts
   └─ tsconfig.json

```