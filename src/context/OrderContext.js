import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const storedOrders = await AsyncStorage.getItem('@order_history');
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (e) { console.error("Lỗi tải đơn hàng", e); }
  };

  const addOrder = async (newOrder) => {
    try {
      const updatedOrders = [newOrder, ...orders]; // Đơn mới lên đầu
      setOrders(updatedOrders);
      await AsyncStorage.setItem('@order_history', JSON.stringify(updatedOrders));
    } catch (e) { console.error("Lỗi lưu đơn hàng", e); }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};