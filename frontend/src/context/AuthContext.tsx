import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: any;
  login: (formData: any) => Promise<void>;
  register: (formData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (formData: any) => {
    const { username, password } = formData;
    const toastId = toast.loading('Logging in...');

    try {
      const body = new URLSearchParams();
      body.append('username', username);
      body.append('password', password);

      const response = await fetch('http://localhost:8000/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Login failed');
      
      const userData = { username: data.username, token: data.access_token };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success(`Welcome, ${data.username}!`, { id: toastId });

    } catch (error: any) {
      toast.error(error.message || 'An error occurred.', { id: toastId });
      throw error;
    }
  };

  const register = async (formData: any) => {
    const { username, password } = formData; // Email is no longer here
    const toastId = toast.loading('Creating account...');

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Send only username and password
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Registration failed');

      toast.success('Account created! Please log in.', { id: toastId });

    } catch (error: any) {
      toast.error(error.message || 'An error occurred.', { id: toastId });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out.');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
