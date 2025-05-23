import React, { createContext, useContext, ReactNode } from 'react';
import { User } from '../types';
import { currentUser, users } from '../data/users';

interface AuthContextType {
  user: User | null;
  isDoctor: boolean;
  isPatient: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(currentUser); // Auto-login for demo

  const isDoctor = user?.role === 'doctor';
  const isPatient = user?.role === 'patient';

  const login = async (email: string, password: string): Promise<User | null> => {
    // Simulate API call and authentication
    // In a real app, this would validate credentials with a backend
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      return foundUser;
    }
    
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isDoctor, isPatient, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};