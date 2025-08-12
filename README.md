# React + Supabase Auth Starter

A modern authentication-ready React application with **Supabase**, **React Router v6**, and **shadcn/ui** components.  
It includes login, signup, password reset flows, protected routes, and toast notifications — all styled with Tailwind CSS.

---

## Dependencies

### Core
- **react** — UI library
- **react-router-dom** — routing and protected route handling
- **@supabase/supabase-js** — Supabase client for authentication & data
- **tailwindcss** — utility-first CSS framework

### Forms & Validation
- **react-hook-form** — form state management
- **zod** — schema validation
- **@hookform/resolvers** — connects `zod` with `react-hook-form`

### UI & Styling
- **shadcn/ui** — modern component library
- **lucide-react** — icons
- **sonner** — toast notifications

### Other
- **typescript** — type safety
- **vite** — fast development server and bundler

---

## Features

- **Authentication**
  - Signup with email/password
  - Login with email/password
  - Password reset (forgot password + reset link)
  - Automatic redirect to intended route after login
  - Protected routes using React Router `<Navigate>`
  - Session persistence with Supabase Auth

- **UI**
  - Styled with Tailwind CSS + shadcn/ui
  - Accessible form inputs, buttons, and toasts
  - Password visibility toggle
  - Loading spinners for async actions

- **Error Handling**
  - Friendly toast messages for:
    - Invalid credentials
    - Network errors
    - User not found
    - Already registered email

- **Routing**
  - Dynamic route redirection (e.g., go to `/reports` after login if originally blocked)
  - `NotFound` page for unknown routes

- **Profile Management**

  - Profile creation on registration.
  - Updating profile.

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-repo.git
cd your-repo
npm install
```

### 2. Configure Supabase

Create a .env.local file with:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Development Server

```bash
npm run dev
```
### 4. Build for Production

```bash
npm run build
```

## Future Improvements

- [ ] Add OAuth providers (Google, GitHub, etc.)
- [ ] Dark mode toggle
- [x] Profile setup

## License

MIT — feel free to use and modify as needed.
