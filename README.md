# Smart Bookmark App
A simple bookmark manager built with Next.js, Supabase, and Tailwind CSS.
Users can log in with Google, add bookmarks, delete bookmarks, and see updates in real-time.

## Live Demo
https://smart-bookmark-app-six-gules.vercel.app/

## GitHub Repository
https://github.com/Tannu-2001/Smart-Bookmark-app

## Features
- Google OAuth login using Supabase
- Add bookmarks (Title + URL)
- Delete bookmarks
- Private bookmarks per user
- Real-time updates (no page refresh required)
- Responsive UI using Tailwind CSS
- Deployed on Vercel


## Tech Stack
- Next.js (App Router)
- Supabase (Authentication + Database + Realtime)
- Tailwind CSS
- Vercel (Deployment)

## Problems Faced and Solutions

### Problem 1: Google login was redirecting back to login page

**Cause:**
Redirect URL was not configured in Supabase.

**Solution:**
Added redirect URL in Supabase:
Authentication → URL Configuration

Added:http://localhost:3000/dashboard
https://smart-bookmark-app-six-gules.vercel.app/dashboard

### Problem 2: Bookmark add/delete required manual refresh

**Cause:**
Supabase Realtime was not enabled properly.

**Solution:**

Enabled realtime in Supabase:

Database → Tables → bookmarks → Edit
Enable Realtime ON

Also added realtime subscription in dashboard page.

### Problem 3: Vercel deployed default Next.js page instead of app

**Cause:**
Correct project files were not pushed to GitHub.

**Solution:**
Pushed the full project including:
src/app
src/components
src/lib


Then Vercel redeployed automatically.

### Problem 4: Google login was auto-logging without account selection

**Solution:**
Added:
```js
prompt: "select_account"
in LoginButton.
Problem 5: Tailwind CSS not applied initially

Solution:

Installed and configured Tailwind properly:

tailwind.config.ts
globals.css

How to Run Locally
npm install
npm run dev
Environment Variables

Create .env.local

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

Assignment Status - All requirements completed successfully.

Author

Tannu Kumari



