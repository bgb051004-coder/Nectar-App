import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { OrderProvider } from './src/context/OrderContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <AppNavigator/>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}