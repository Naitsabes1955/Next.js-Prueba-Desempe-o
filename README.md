# Nait's Recipes 🍳

Cooking recipe application built with **Next.js 16 (App Router)**, **React 19**, **MongoDB Atlas**, and **JWT**, developed as a full-stack performance assessment.

It allows users to browse a recipe catalog, view recipe details, register/login, and save recipes as favorites.

---

## Technical Stack

| Layer          | Technology                                                |
| -------------- | --------------------------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack)                        |
| UI             | React 19 + Tailwind CSS 4 (vanilla, no component library) |
| Database       | MongoDB Atlas + Mongoose 7                                |
| Authentication | JWT (access token + refresh token) in httpOnly cookies    |
| Email          | Nodemailer (Gmail SMTP with App Password)                 |
| Language       | TypeScript                                                |

---

## Project Structure

```text
src/
├── app/
│   ├── api/                  # Route Handlers (HTTP controllers)
│   │   ├── favorites/
│   │   │   ├── route.ts          # GET, POST, DELETE (via body) /api/favorites
│   │   │   └── [id]/route.ts     # DELETE /api/favorites/:id
│   │   ├── login/route.ts
│   │   ├── logout/route.ts
│   │   ├── me/route.ts
│   │   ├── recipes/
│   │   │   ├── route.ts          # GET /api/recipes
│   │   │   └── [id]/route.ts     # GET /api/recipes/:id
│   │   ├── refresh/route.ts
│   │   └── register/route.ts
│   ├── favorites/page.tsx     # "My Favorites" view (requires auth)
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── recipes/
│   │   ├── page.tsx           # Recipe catalog
│   │   └── [id]/page.tsx      # Recipe details
│   └── layout.tsx
├── components/
│   ├── RecipeCard.tsx          # Reusable component (props)
│   └── ui/                     # FormAlert, redirect, etc.
├── context/
│   └── AuthContext.tsx         # Global session state (user, token)
├── database/
│   └── models/                 # Mongoose schemas: User, Recipes, Favorites
├── lib/
│   └── db.ts                   # MongoDB connection (singleton)
├── services/                   # Service layer (single gateway to the DB)
│   ├── auth.ts                 # registerUser, loginUser, JWT tokens
│   ├── favorites.ts             # addFavorite, removeFavorite, getFavoritesByUser...
│   ├── recipes.ts               # getRecipes, getRecipeById
│   ├── mail.ts                  # sendWelcomeEmail (Nodemailer)
│   └── api.ts                   # Fetch client used from the frontend
└── types/                      # Shared types (AuthForm, RecipeProps...)
```

**Architecture:** routes (`src/app/api/**/route.ts`) only orchestrate the HTTP request (read cookies, parse the body, return the `NextResponse`). All business logic and MongoDB access live in `src/services/*`, which is the only layer that imports Mongoose models.

---

## MongoDB Collections

| Collection  | Description                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| `users`     | Registered users (`name`, `email`, `password` hashed with bcrypt)              |
| `recipes`   | Recipe catalog (basic and extended fields: `ingredients`, `steps`, `portions`) |
| `favorites` | `userId` ↔ `recipeId` relationship, with a unique index to prevent duplicates  |

---

## Environment Variables

Create a `.env.local` file in the project root (it is already in `.gitignore`, **never upload it to the repository**):

```env
MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority"
JWT_SECRET=a_long_random_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

| Variable     | Purpose                                                   |
| ------------ | --------------------------------------------------------- |
| `MONGO_URI`  | Connection string to your MongoDB Atlas cluster           |
| `JWT_SECRET` | Secret key used to sign access/refresh tokens             |
| `EMAIL_USER` | Gmail account used to send the welcome email              |
| `EMAIL_PASS` | Gmail **App Password** (not the regular account password) |

> ⚠️ **How to generate a Gmail App Password:** enable two-factor authentication on your Google account and then visit `https://myaccount.google.com/apppasswords` to generate a 16-character password specifically for this application. It is different from your regular account password.

---

## Installation and Running

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (see previous section)
# create your own .env.local with your values

# 3. Start the development server
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

---

## Routes / Views

| Route           | Description                                   | Auth Required |
| --------------- | --------------------------------------------- | ------------- |
| `/recipes`      | Recipe list                                   | No            |
| `/recipes/[id]` | Recipe details (ingredients, steps, portions) | No            |
| `/login`        | Sign in                                       | No            |
| `/register`     | Register a new user                           | No            |
| `/favorites`    | Favorite recipes                              | Yes           |

## API (Route Handlers)

| Method   | Route                | Description                                                   |
| -------- | -------------------- | ------------------------------------------------------------- |
| `GET`    | `/api/recipes`       | Lists all recipes (includes `isFavorite` if a session exists) |
| `GET`    | `/api/recipes/:id`   | Recipe details                                                |
| `POST`   | `/api/register`      | Creates a user, sets cookies, and sends a welcome email       |
| `POST`   | `/api/login`         | Signs in and sets cookies                                     |
| `POST`   | `/api/logout`        | Signs out                                                     |
| `GET`    | `/api/me`            | Current authenticated user                                    |
| `POST`   | `/api/refresh`       | Renews the access token using the refresh token               |
| `GET`    | `/api/favorites`     | Favorite recipes of the authenticated user                    |
| `POST`   | `/api/favorites`     | Adds a recipe to favorites (`{ recipeId }` in the body)       |
| `DELETE` | `/api/favorites`     | Removes a recipe from favorites (`{ recipeId }` in the body)  |
| `DELETE` | `/api/favorites/:id` | Removes a recipe from favorites using the id in the URL       |

---

## Authentication

* On login/registration, the backend generates an **access token** (15 min) and a **refresh token** (30 days) signed with `JWT_SECRET`, and stores them in `httpOnly` cookies.
* The middleware (`middleware.ts`) protects the `/favorites` route: if there is no `accessToken`, it redirects to `/login`.
* `AuthContext` keeps the user in memory/`localStorage` on the client and validates the session against `/api/me`.

## Welcome Email

When a new user registers, `POST /api/register` calls `sendWelcomeEmail` (service layer: `src/services/mail.ts`), which uses Nodemailer with Gmail SMTP transport to send an HTML welcome email. If sending fails (misconfigured credentials, no internet connection, etc.), the error is logged to the console but **does not** prevent the user registration from completing.

---
