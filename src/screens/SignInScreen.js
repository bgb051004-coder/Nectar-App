import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      
      {/* Top Image */}
      <Image
        source={require("../../assets/images/bglogin.png") }
        style={styles.image}
        resizeMode="cover"
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Get your groceries{"\n"}with nectar
        </Text>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.flag}>🇻🇳</Text>
          <TextInput
            placeholder="+84"
            style={styles.input}
            onFocus={() => navigation.navigate("Number")}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider} />
        <Text style={styles.orText}>
          Or connect with social media
        </Text>

        {/* Google Button */}
        <TouchableOpacity style={styles.googleBtn}>
            <AntDesign name="google" size={24} color="#fff" style={{ marginRight: 10 }} />   
            <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Facebook Button */}
        <TouchableOpacity style={styles.fbBtn}>
            <FontAwesome name="facebook" size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.btnText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    height: height * 0.4,
    borderBoottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },

  title: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  flag: {
    fontSize: 20,
    marginRight: 10,
  },

  input: {
    fontSize: 18,
    flex: 1,
    color: '#181725',
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },

  orText: {
    textAlign: "center",
    color: "#888",
    marginVertical: 15,
  },

  googleBtn: {
  flexDirection: "row",
  backgroundColor: "#5383EC",
  padding: 15,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 15,
},

fbBtn: {
  flexDirection: "row",
  backgroundColor: "#4A66AC",
  padding: 15,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
},

btnText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
  marginLeft: 10,
},
});