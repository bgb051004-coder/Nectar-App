import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import storageService from '../services/storageService';

const { width, height } = require("react-native").Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const initApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Giả lập thời gian load
      
      const { token } = await storageService.getLoginData();
      if (token) {
        navigation.replace('Home');
      } else {
        navigation.replace('Onboarding');
      }
    };
    initApp();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: height * 0.02,
    tintColor: "#fff",
  },
});