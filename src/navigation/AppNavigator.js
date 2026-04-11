import React, { useContext } from "react"; // Chỉ cần useContext
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from '../context/AuthContext';

// Import các màn hình
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SignInScreen from "../screens/SignInScreen";
import NumberScreen from "../screens/NumberScreen";
import VerificationScreen from "../screens/VerificationScreen";
import LocationScreen from "../screens/LocationScreen";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ExploreScreen from "../screens/ExploreScreen";
import BeveragesScreen from "../screens/BeveragesScreen";
import SearchScreen from "../screens/SearchScreen";
import FilterScreen from "../screens/FilterScreen";
import CartScreen from "../screens/CartScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import CheckoutScreen from "../screens/CheckOutScreen";
import OrderAcceptedScreen from "../screens/OderAcceptedScreen";
import ErrorScreen from "../screens/ErrorScreen";
import AccountScreen from "../screens/AccountScreen";
import OrderHistoryScreen from "../screens/OderHistoryScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  // Lấy giá trị trực tiếp từ Context
  const { userToken, isLoading, isLoggingOut } = useContext(AuthContext);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
      >
        {userToken == null ? (
          <>
            {isLoggingOut && <Stack.Screen name="LogIn" component={LogInScreen} />}

            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />

            {!isLoggingOut && <Stack.Screen name="LogIn" component={LogInScreen} />}   
                     
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Number" component={NumberScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Explore" component={ExploreScreen} />
            <Stack.Screen name="Beverages" component={BeveragesScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Filter" component={FilterScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Favourite" component={FavouriteScreen} />
            <Stack.Screen 
              name="Checkout" 
              component={CheckoutScreen} 
              options={{
                presentation: 'transparentModal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen name="OrderAccepted" component={OrderAcceptedScreen} />
            <Stack.Screen 
              name="Error" 
              component={ErrorScreen} 
              options={{
                presentation: 'transparentModal',
                animation: 'fade',
              }}
            />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}