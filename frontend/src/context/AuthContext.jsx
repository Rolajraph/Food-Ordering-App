import { createContext, useState, useEffect } from 'react';
import { registerRequest, loginRequest, getProfileRequest } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app load, check if a token exists and try to restore the session
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getProfileRequest();
        setUser(response.data.data.user);
      } catch {
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const register = async (formData) => {
    const response = await registerRequest(formData);
    const { user: newUser, token } = response.data.data;
    localStorage.setItem('authToken', token);
    setUser(newUser);
  };

  const login = async (formData) => {
    const response = await loginRequest(formData);
    const { user: loggedInUser, token } = response.data.data;
    localStorage.setItem('authToken', token);
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;