import React, { createContext, useState, useEffect } from 'react';
import storageService from '../services/storageService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Kiểm tra trạng thái đăng nhập khi mở app
  const checkLogin = async () => {
    try {
      const { token } = await storageService.getLoginData();
      setUserToken(token);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // Hàm đăng nhập
  const login = async (userData, token) => {
    await storageService.saveLoginData(userData, token);
    setIsLoggingOut(false);
    setUserToken(token);
  };

  // Hàm đăng xuất
  const logout = async () => {
    await storageService.clearLoginData();
    setIsLoggingOut(true);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, isLoggingOut, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};