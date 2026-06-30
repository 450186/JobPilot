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

```txt
JobPilot
├─ client
├─ server
│  ├─ src
│  │  ├─ db.ts
│  │  ├─ index.ts
│  │  └─ routes
│  │     └─ applications.ts
│  ├─ .env
│  ├─ package.json
│  └─ tsconfig.json
└─ README.md