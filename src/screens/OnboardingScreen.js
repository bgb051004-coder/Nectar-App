import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/onbording.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Overlay tối nhẹ */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.content}>
        <Image
          source={require("../../assets/minilogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Welcome{"\n"}to our store
        </Text>

        <Text style={styles.subtitle}>
          Ger your groceries in as fast as one hour
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("SignIn")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  content: {
    alignItems: "center",
    paddingBottom: height * 0.15,
    paddingHorizontal: 20,
  },

  logo: {
    fontSize: 30,
    marginBottom: 10,
    color: "#fff",
  },

  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  subtitle: {
    fontSize: width * 0.035,
    color: "#ddd",
    textAlign: "center",
    marginVertical: 10,
  },

  button: {
    backgroundColor: "#53B175",
    width: "90%",
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});