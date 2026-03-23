import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const { width, height } = require("react-native").Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2000);
    return () => clearTimeout();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
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