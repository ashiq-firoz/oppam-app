// src/context/AuthContext.tsx
"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/app/firebase/config';

interface AuthContextType {
  userId: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ userId: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);