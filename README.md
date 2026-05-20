# DocAppoint - Doctor Appointment Booking System

**DocAppoint** is a modern, full-stack doctor appointment booking platform built with Next.js 15 and Express.js.

## Live Site

🌐 **URL:** [https://docappoint.vercel.app](https://docappoint.vercel.app)

## Features

- **Browse Top Doctors** — Discover and view profiles of highly-rated medical professionals with detailed information
- **Smart Search & Sorting** — Search doctors by name and sort by rating or consultation fee
- **Secure Authentication** — Better Auth email/password login with Google OAuth support
- **Easy Booking** — Book appointments through an intuitive modal form with real-time validation
- **Appointment Management** — View, update, and delete your bookings from a personalized dashboard
- **Profile Management** — Update your name and profile photo instantly
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop devices
- **Animated UI** — Smooth Framer Motion animations with a modern Medinest-inspired healthcare aesthetic
- **SEO Optimized** — Proper metadata on every page for better search engine visibility

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion, Swiper.js
- **Backend:** Express.js, MongoDB, Better Auth session cookies
- **Deployment:** Vercel (Client), Render (Server)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Google Cloud Console project (for OAuth)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` file:
   ```env
   NEXT_PUBLIC_SERVER_URL=http://localhost:5000
   NEXT_PUBLIC_APP_NAME=DocAppoint
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero banner, top-rated doctors, services, why choose us |
| `/appointments` | All doctors with search and sorting |
| `/doctors/[id]` | Doctor details with booking modal |
| `/login` | User login with email/password and Google |
| `/register` | User registration with password validation |
| `/dashboard` | My Bookings + My Profile (private route) |

## Authentication

- Password must contain at least 1 uppercase letter, 1 lowercase letter, and be minimum 6 characters
- Better Auth manages session cookies across the client and server
- Social login uses Google OAuth through the backend auth callback

## Production Setup

- `NEXT_PUBLIC_SERVER_URL=https://your-render-service.onrender.com`
- Render `CLIENT_URL` must exactly match your Vercel production domain
- Google OAuth redirect URI must point to `https://your-render-service.onrender.com/api/auth/callback/google`

## License

MIT License
