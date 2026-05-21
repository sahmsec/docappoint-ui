'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authClient } from './auth-client';
import api from './axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [jwtToken, setJwtToken] = useState(null);

  // Use Better Auth's built-in useSession hook for reactive session state
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (session?.user) {
      setUser({
        _id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        photoURL: session.user.image || '',
      });
      
      // Fetch JWT token using the /api/auth/token endpoint
      api.get('/api/auth/token')
        .then(res => {
          if (res.data?.token) {
            setJwtToken(res.data.token);
          } else if (res.token) {
            setJwtToken(res.token);
          }
        })
        .catch(err => console.error('Error fetching JWT:', err));
        
    } else {
      setUser(null);
      setJwtToken(null);
    }

    setLoading(false);
  }, [session, isPending]);

  // Email + Password Registration via Better Auth
  const register = async (name, email, password, photoURL) => {
    const result = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL || '',
    });
    if (result.error) {
      return { success: false, message: result.error.message || 'Registration failed' };
    }
    return { success: true, message: 'Registration successful! Please login.' };
  };

  // Email + Password Login via Better Auth
  const login = async (email, password) => {
    const result = await authClient.signIn.email({ email, password });
    if (result.error) {
      return { success: false, message: result.error.message || 'Login failed' };
    }
    if (result.data?.user) {
      setUser({
        _id: result.data.user.id,
        name: result.data.user.name,
        email: result.data.user.email,
        photoURL: result.data.user.image || '',
      });
    }
    return { success: true, message: 'Login successful!' };
  };

  // Google OAuth Login via Better Auth (redirects to Google)
  const googleLogin = async (callbackURL) => {
    const absoluteCallbackURL = callbackURL?.startsWith('http')
      ? callbackURL
      : `${window.location.origin}${callbackURL || '/'}`;

    const result = await authClient.signIn.social({
      provider: 'google',
      callbackURL: absoluteCallbackURL,
    });

    if (result.error) {
      throw new Error(result.error.message || 'Google login failed');
    }
  };

  // Logout via Better Auth
  const logout = async () => {
    await authClient.signOut();
    setUser(null);
    window.location.href = '/';
  };

  // Profile update via Better Auth
  const updateProfile = async (profileData) => {
    const result = await authClient.updateUser({
      name: profileData.name,
      image: profileData.photoURL
    });
    
    if (result.error) {
      return { success: false, message: result.error.message };
    }
    
    // Update local state
    setUser(prev => ({
      ...prev,
      name: profileData.name || prev.name,
      photoURL: profileData.photoURL || prev.photoURL
    }));
    
    return { success: true, data: result.data };
  };

  return (
    <AuthContext.Provider value={{ user, jwtToken, loading: loading || isPending, login, register, googleLogin, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
