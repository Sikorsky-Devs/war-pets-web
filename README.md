# War Pets Web

> **War Pets Web** is a web application created to improve cooperation between animal shelters, volunteers who rescue stray animals, and people who want to adopt pets. It allows users to register as a shelter or a volunteer, manage shelter or volunteer profiles, post animal profiles, and interact through a request system: volunteers can publish animals and handle transfer requests, while shelters can submit requests to receive rescued animals.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User authentication and roles**: shelters, volunteers, adopters.
- **Pet listing**: View and add pets available for adoption.
- **Shelter profiles**: Manage shelters, contact info, and listed animals.
- **Commenting system**: Leave and read comments about pets.
- **Responsive UI** with mobile support and dark mode.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/), TypeScript
- **UI**: Tailwind CSS, Radix UI, Shadcn UI
- **Form handling**: React Hook Form + Zod
- **State management**: Zustand
- **API integration**: REST
- **Linting**: ESLint, Prettier

## Prerequisites

- **Node.js** ≥ v16
- **pnpm** (or `npm`/`yarn` if reconfigured)

## Getting Started

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Sikorsky-Devs/war-pets-web.git
cd war-pets-web
```

2. **Install dependencies:**

```bash
pnpm install
# or
npm install
```

### Environment Variables

Copy the example file and edit as needed:

```bash
cp .env.example .env
```

Example contents of `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Running the App

**Development mode:**

```bash
pnpm dev
# or
npm run dev
```

**Production build:**

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── pet-auth.jpg
│       └── pet-hero.webp
└── src/
    ├── api/
    │   ├── auth/
    │   │   ├── auth.api.ts
    │   │   └── auth.dto.ts
    │   ├── comments/
    │   ├── contacts/
    │   ├── pets/
    │   ├── posts/
    │   └── users/
    ├── app/
    │   ├── (main)/
    │   │   ├── profile/
    │   │   │   ├── profile/
    │   │   │   │   └── page.tsx
    │   │   │   ├── shelter-profile/
    │   │   │   │   └── page.tsx
    │   │   │   └── layout.tsx
    │   │   ├── adverts/
    │   │   ├── posts/
    │   │   ├── shelters/
    │   │   │   ├── [id]/
    │   │   │   │   └── page.tsx
    │   │   │   └── page.tsx
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   └── auth/
    │       ├── approve-email/
    │       ├── sign-in/
    │       ├── sign-up/
    │       ├── success/
    │       └── layout.tsx
    ├── components/
    ├── constants/
    ├── features/
    │   ├── adverts/
    │   ├── auth/
    │   ├── home/
    │   ├── posts/
    │   ├── profile/
    │   ├── shelter/
    │   ├── shelter-profile/
    │   └── shelters/
    ├── hooks/
    ├── lib/
    ├── permissions/
    ├── providers/
    ├── store/
    ├── styles/
    ├── types/
    └── utils/
```

## Architecture Overview

- **public/**  
  Contains static files that are directly accessible by the browser, such as images and the favicon.

- **src/**  
  The main source directory, organized as follows:
    - **api/**  
      Modules responsible for backend communication. These include:
        - **auth/** — Handles authentication-related API functions.
        - **comments/** — Manages functionalities related to comments.
        - **contacts/** — Responsible for contact data and inquiries.
        - **pets/** — Manages pet-related API functions.
        - **posts/** — Handles operations related to posts.
        - **users/** — Manages user-related API functions.
    - **app/**  
      Contains files related to pages and routing:
        - **(main)/** — The main section of the application, including:
            - **profile/** — Contains pages for both user profiles and shelter profiles.
            - **adverts/**, **posts/**, and **shelters/** — Sections for adverts, posts, and shelters respectively.
        - **auth/** — Dedicated to authentication flows, such as registration, signing in, email approval, and success notifications.
    - **components/**  
      A library of reusable UI components (e.g., buttons, cards, modals, and layout elements).
    - **constants/**  
      Files containing constant values and enumerations used throughout the application.
    - **features/**  
      Modules encapsulating specific functional features (e.g., adverts, auth, home, posts, profile, shelter, shelter-profile, shelters).
    - **hooks/**  
      Custom React hooks that encapsulate reusable logic.
    - **lib/**  
      Helper libraries and utilities for API requests, data transformations, and other common tasks.
    - **permissions/**  
      Utilities for managing user permissions and access control.
    - **providers/**  
      React context providers for global state management and theming.
    - **store/**  
      State management files (for example, using Zustand).
    - **styles/**  
      Global styling and CSS files.
    - **types/**  
      Shared TypeScript interfaces and type definitions used across the application.
    - **utils/**  
      General utility functions and helper modules.

## Contributing

You are welcome to contribute in any of the following ways:

1. Report or fix bugs.
2. Implement new features (e.g., filters, pet categories, maps).
3. Improve UI/UX or accessibility.
4. Refactor or improve code readability.

### How to Contribute

1. **Fork** this repository.
2. **Create** a branch:
   ```bash
   git checkout -b my-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. **Push** to your fork:
   ```bash
   git push origin my-feature
   ```
5. Open a **Pull Request** to the main repository.
