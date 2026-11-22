# Frontend Mentor - Interactive Comments Section

This is my solution to the [Interactive Comments Section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9).

The original challenge was designed around static JSON data. I decided to take it further and turn it into my first full-stack application, adding a PostgreSQL database, custom authentication, and server-side functionality.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Features](#features)
  - [What I learned](#what-i-learned)
- [Getting started](#getting-started)
- [Future improvements](#future-improvements)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size.
- See hover and focus states for interactive elements.
- Create, read, update, and delete comments and replies.
- Reply to existing comments, including nested replies.
- Upvote and downvote comments.
- Register, log in, and continue as a guest.
- See comments appear immediately through optimistic UI updates.

### Screenshots

![Desktop screenshot](./screenshots/desktop.png)
![Mobile screenshot](./screenshots/mobile.png)

### Links

- Solution URL: [GitHub](https://github.com/piyush-kaushik24/interactive-comments-section)
- Live Site URL: [View Live Project](https://interactive-comments-section-lgsuofbdu-piyush-629a.vercel.app/login)

## My process

### Built with

- Semantic HTML5
- Mobile-first responsive design
- CSS Grid and Flexbox
- [TypeScript](https://www.typescriptlang.org/)
- [React 19](https://react.dev/)
- [Next.js 16](https://nextjs.org/) - App Router
- [Tailwind CSS v4](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Neon](https://neon.com/) - Serverless PostgreSQL
- Server Actions
- Custom session-based authentication
- `bcryptjs` for password hashing

### Features

**Authentication**

- User registration and login.
- Password hashing with bcryptjs.
- Database-backed sessions with expiration.
- HttpOnly cookies.
- Guest access without requiring registration.

**Comments and replies**

- Create, edit, and delete comments.
- Nested replies with recursive rendering.
- Delete confirmation modal.
- Users can manage their own comments.

**Optimistic UI**

- Comments and replies appear immediately when submitted.
- Pending comments display a loading indicator and reduced opacity.
- The UI updates with the persisted database data once the server action completes.

**Voting system**

- Upvote and downvote comments.
- PostgreSQL constraints prevent duplicate votes.
- SQL UPSERT handles changes to existing votes.

**Server-side protection**

- Protected routes based on session validity.
- Server-side authentication and authorization checks.
- Ownership verification before allowing comment modifications.

### What I learned

This was my first full-stack project, and it helped me understand how the frontend and backend work together.

Some of the most important things I learned:

**1. Authentication and session management**

I implemented authentication from scratch using password hashing, database-backed sessions, and HttpOnly cookies. This helped me understand how login, session validation, and logout work beyond the frontend.

**2. Server Components and Client Components**

I learned how to use Server Components for fetching data and handling server-side logic, while keeping interactive features such as forms, modals, and optimistic updates in Client Components.

**3. Optimistic UI with React 19**

I used `useOptimistic` to display comments and replies before the database request finishes. This helped me understand temporary UI state and how it reconciles with updated server data.

**4. Relational database design and SQL**

I worked with PostgreSQL tables, foreign keys, joins, and self-referencing relationships to support users, comments, and nested replies.

I also learned to resolve ambiguous column errors and use `ON CONFLICT` to handle duplicate votes.

**5. Server-side security**

I learned not to trust client-side data for security-sensitive operations. Authentication, comment ownership, and voting permissions are verified on the server.

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/piyush-kaushik24/YOUR-REPOSITORY-NAME.git
cd YOUR-REPOSITORY-NAME
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL="your-neon-postgresql-connection-string"
```

### 4. Initialize the database

Run the database initialization or seed script using the documented local development procedure.

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Future improvements

- [ ] Add real-time updates using WebSockets or polling.
- [ ] Implement custom avatar uploads.
- [ ] Add automated tests for authentication and comment actions.
- [ ] Improve form validation and error handling.

## Author

- GitHub - [@piyush-kaushik24](https://github.com/piyush-kaushik24)
- Frontend Mentor - [@piyush-kaushik24](https://www.frontendmentor.io/profile/piyush-kaushik24)
