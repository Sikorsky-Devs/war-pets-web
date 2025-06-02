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

A simplified look at the project layout:

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

## Patterns

### SOLID

- [SRP](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/components/user-avatar.tsx) - The component is responsible for rendering a user avatar.

- [OCP](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/components/ui/button.tsx) - The component is open for adding styles without changing its internal logic. [Example](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/features/posts/components/create-post-modal.tsx)

- [LSP](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/components/ui/button.tsx) - We can change default button with UI kit button and it will work the same.

- [ISP](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/store/use-chat-store.ts)- The store is responsible for managing chat state, so states and actions were divided into different interfaces.

- [DIP](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/api/posts/posts.api.ts) - The API module is responsible for making requests to the backend, so UI components do not depend on the implementation details of the API.

### GRASP

1. [Information Expert](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/features/adverts/component/pet-card.tsx) - Pet card accept only needed props.

2. [Creator](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/features/profile/components/lists/pet-requests.tsx) - Pet requests list creates request cards.

3. [Controller](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/features/shelter/shelter.page.tsx) - User can control the flow of the application.

4. High Coupling and Low Cohesion - The project uses `Feature-based module architecture` to achieve high coupling beetween domain entities and low cohesion.
5. [Indirection](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/lib/toast.ts) - The project uses `Dependency Injection` in `lib/toast.ts` to achieve indirection.

### GoF

1. [Factory Method](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/features/profile/components/profile-factory.tsx) - The profile factory creates different profile components based on the user role.

2. [Decorator](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/providers/animation-provider.tsx) - The animation provider decorates the components with animations.

3. [Observer](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/components/chat/chat-popover.tsx) - The chat popover component observes the chat store and updates its state accordingly.

4. [Proxy](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/providers/auth-provider.tsx) - The auth provider proxy wrap all the components and redirects the user to the login page if they are not authenticated.

5. [State](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/features/profile/components/lists/pet-requests.tsx) - The pet requests list component uses the state pattern to render different content based on the state.

### Other

6. [Facade](https://github.com/Sikorsky-Devs/war-pets-web/blob/main/src/lib/chat.ts) - The chat facade is a wrapper around the chat API.
