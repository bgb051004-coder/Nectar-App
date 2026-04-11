import React, { createContext, useState, useEffect } from 'react';
import storageService from '../services/storageService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null); 
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [orders, setOrders] = useState([]);

  // Kiểm tra trạng thái đăng nhập khi mở app
  const checkLogin = async () => {
    try {
      const data = await storageService.getLoginData();
      if (data && data.token) {
        setIsAutoLogin(true);
        setUserToken(data.token);
        setUserInfo(data.user); // Lưu thông tin user (bao gồm username) vào state
        const savedOrders = await storageService.getOrders(); 
        if (savedOrders) setOrders(savedOrders);
      }
    } catch (error) {
      console.log("Lỗi checkLogin:", error);
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
    setIsAutoLogin(false);
    setUserInfo(userData); // Cập nhật thông tin user ngay khi login
  };

  const completeLogin = (token) => {
  setUserToken(token);
}

  // Hàm đăng xuất
  const logout = async () => {
    await storageService.clearLoginData();
    setIsLoggingOut(true);
    setUserInfo(null); // Cập nhật thông tin user ngay khi login
    setUserToken(null);
    setOrders([]);
  };

  const addOrder = async (newOrder) => {
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);

    // LƯU VÀO MÁY
    await storageService.saveOrders(updatedOrders);
  };

  return (
    <AuthContext.Provider value={{ userToken, userInfo, isLoading, isLoggingOut, isAutoLogin, login, logout, completeLogin, orders, addOrder  }}>
      {children}
    </AuthContext.Provider>
  );
};