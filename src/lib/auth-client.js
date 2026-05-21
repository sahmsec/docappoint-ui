'use client';

import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    jwtClient()
  ],
  baseURL: typeof window !== 'undefined' 
    ? window.location.origin + '/api/auth' 
    : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000') + '/api/auth',
});
