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
  const loadOrdersFromStorage = async () => {
    const savedOrders = await storageService.getOrders();
    setOrders(savedOrders || []); // Nếu null thì set mảng rỗng
  };

  // Kiểm tra trạng thái đăng nhập khi mở app
  const checkLogin = async () => {
    try {
      const data = await storageService.getLoginData();
      if (data && data.token) {
        setIsAutoLogin(true);
        setUserToken(data.token);
        setUserInfo(data.user); // Lưu thông tin user (bao gồm username) vào state
        await loadOrdersFromStorage(); // Tải đơn hàng từ storage khi auto-login thành công
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
    try {
      await storageService.saveLoginData(userData, token);
      setIsLoggingOut(false);
      setIsAutoLogin(false);
      setUserInfo(userData);
      
      // QUAN TRỌNG: Load lại đơn hàng ngay khi đăng nhập thành công
      await loadOrdersFromStorage(); 
    } catch (error) {
      console.error("Lỗi khi login:", error);
    }
  };

  const completeLogin = (token) => {
  setUserToken(token);
}

  // Hàm đăng xuất
  const logout = async () => {
    try {
      await storageService.clearLoginData();
      // Nếu bạn muốn xóa lịch sử đơn hàng khi người dùng Logout (để người sau không thấy):
      await storageService.clearOrders(); 
      
      setIsLoggingOut(true);
      setUserInfo(null);
      setUserToken(null);
      setOrders([]); // Reset state về mảng rỗng
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
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