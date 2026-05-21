# DocAppoint — Doctor Appointment Booking System

**DocAppoint** is a modern, full-stack doctor appointment booking platform built with **Next.js 15** and **Express.js**. It features a polished healthcare-inspired UI with dark/light theme support, smooth animations, and a seamless booking experience.

## Live Site

🌐 [docappoint-psi.vercel.app](docappoint-psi.vercel.app)

## Features

- **Browse Top Doctors** — Discover highly-rated medical professionals with detailed profiles, ratings, and consultation fees
- **Smart Search & Sorting** — Search doctors by name and sort by rating or fee (low-to-high / high-to-low)
- **Secure Authentication** — Email/password login with Google OAuth support via Better Auth
- **Easy Booking** — Book appointments through an intuitive modal with real-time form validation
- **Appointment Management** — View, update, and delete bookings from a personalized dashboard
- **Patient Reviews** — Read and write verified reviews after completing an appointment
- **Theme Toggle** — Switch between Light and Dark modes with smooth transitions
- **Profile Management** — Update your name and profile photo instantly
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- **Animated UI** — Smooth Framer Motion & GSAP animations with a premium healthcare aesthetic
- **Custom 404 Page** — Friendly illustrated not-found page
- **SEO Optimized** — Proper metadata on every page for search engine visibility

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 15 (App Router), React 19 |
| **Styling** | Tailwind CSS 3, CSS Variables (theme tokens) |
| **Animations** | Framer Motion, GSAP |
| **UI Components** | Lucide React (icons), Swiper.js (carousels) |
| **HTTP Client** | Axios |
| **Auth** | Better Auth (session cookies) |
| **Theming** | next-themes |
| **Notifications** | react-hot-toast |
| **Backend** | Express.js, MongoDB |
| **Deployment** | Vercel (frontend), Render (backend) |

## Project Structure

```
src/
├── app/
│   ├── layout.js            # Root layout with Navbar, Footer, providers
│   ├── page.jsx             # Home page
│   ├── globals.css          # Global styles & theme tokens
│   ├── providers.jsx        # Theme provider wrapper
│   ├── not-found.jsx        # Custom 404 page
│   ├── appointments/        # All doctors listing with search/sort
│   ├── dashboard/           # My Bookings & Profile (protected)
│   ├── doctors/[id]/        # Doctor detail page with booking modal
│   ├── login/               # Login page
│   └── register/            # Registration page
├── components/
│   ├── Navbar.jsx           # Top navigation bar
│   ├── Footer.jsx           # Site footer
│   ├── DoctorCard.jsx       # Doctor card used in listings
│   ├── Dashboard3DCard.jsx  # 3D-style booking card for dashboard
│   ├── AnimatedButton.jsx   # Reusable animated CTA button
│   ├── HeroCarousel.jsx     # Image carousel component
│   ├── Loader.jsx           # Loading spinner/skeleton
│   ├── Logo.jsx             # Brand logo component
│   ├── ScrollToTop.jsx      # Scroll-to-top on navigation
│   ├── UserAvatar.jsx       # User avatar with fallback
│   └── home/
│       ├── HeroSection.jsx
│       ├── TopDoctorsSection.jsx
│       ├── ServicesSection.jsx
│       ├── WhyChooseUsSection.jsx
│       └── MarqueeSection.jsx
└── lib/
    ├── auth-client.js       # Better Auth client instance
    ├── auth-context.js      # Auth context provider & hooks
    └── axios.js             # Pre-configured Axios instance
```

## Getting Started

### Prerequisites

- **Node.js 18+**
- **MongoDB Atlas** account (or local MongoDB)
- **Google Cloud Console** project (for OAuth)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sahmsec/docappoint-ui.git
   cd docappoint-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env.local` file** in the project root:
   ```env
   NEXT_PUBLIC_SERVER_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero banner, top-rated doctors, services, why choose us |
| `/appointments` | All doctors with search and sorting |
| `/doctors/[id]` | Doctor details with booking modal and reviews |
| `/login` | Login with email/password or Google OAuth |
| `/register` | Registration with password validation |
| `/dashboard` | My Bookings + My Profile (protected route) |

## Authentication

- Passwords require at least **1 uppercase**, **1 lowercase**, and a **minimum of 6 characters**
- Better Auth manages session cookies across client and server
- Google OAuth login is handled through the backend auth callback

## Production Setup

1. Set your environment variable:
   ```env
   NEXT_PUBLIC_SERVER_URL=https://your-render-service.onrender.com
   ```

2. Ensure the backend `CLIENT_URL` exactly matches your Vercel production domain

3. Set the Google OAuth redirect URI to:
   ```
   https://your-render-service.onrender.com/api/auth/callback/google
   ```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT License
