import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppNavigator/>
      </CartProvider>
    </AuthProvider>
  );
}