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
│  │  │  └─ applications.ts
│  │  ├─ components
│  │  │  ├─ ApplicationTable.tsx
│  │  │  └─ Navbar.tsx
│  │  ├─ index.css
│  │  ├─ main.tsx
│  │  ├─ pages
│  │  │  ├─ Applications.tsx
│  │  │  └─ Dashboard.tsx
│  │  ├─ styles
│  │  └─ types
│  │     └─ Applications.ts
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
   │  └─ types
   │     └─ Applcations.ts
   └─ tsconfig.json

```