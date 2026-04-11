import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff, Check } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const handleSignup = async () => {
    // 1. Kiểm tra validation cơ bản
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 10) {
      Alert.alert("Error", "Password must be at least 10 characters");
      return;
    }

    try {
      // 2. Tạo đối tượng người dùng mới
      const newUser = {
        username: username,
        email: email,
        password: password,
      };

      console.log("Đang lưu dữ liệu người dùng...");
      // 3. Lưu vào máy với key giả lập '@registered_user'
      await AsyncStorage.setItem('@registered_user', JSON.stringify(newUser));
      console.log("Lưu thành công, đang hiển thị thông báo chuyển hướng");

      Alert.alert(
        "Success", 
        "Account created successfully! Please log in.",
        [{ text: "OK", onPress: () => navigation.navigate('LogIn') }]
      );

    } catch (error) {
      console.error("Signup Error:", error);
      Alert.alert("Error", "Something went wrong during signup.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background mờ ảo */}
      <Image 
        source={require('../../assets/images/mask_group.png')} 
        style={styles.backgroundImage} 
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Logo củ cà rốt */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/carrot_orange.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Enter your credentials to continue</Text>
          </View>

          <View style={styles.form}>
            {/* Input Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="words"
              />
            </View>

            {/* Input Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {/* Icon Check màu xanh khi email hợp lệ */}
                <Check color="#53B175" size={20} />
              </View>
              <View style={styles.divider} />
            </View>

            {/* Input Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secureText}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                  {secureText ? (
                    <EyeOff color="#7C7C7C" size={20} />
                  ) : (
                    <Eye color="#7C7C7C" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />
            </View>

            {/* Điều khoản dịch vụ */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing you agree to our{' '}
                <Text style={styles.linkText}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.linkText}>Privacy Policy.</Text>
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.signupBtn}
              onPress={handleSignup}
            >
              <Text style={styles.signupBtnText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                <Text style={styles.linkText}>Log In</Text> 
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 60,
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#181725',
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    marginTop: 10,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600',
  },
  input: {
    fontSize: 18,
    color: '#181725',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
    width: '100%',
  },
  termsContainer: {
    marginTop: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#7C7C7C',
    lineHeight: 22,
  },
  linkText: {
    color: '#53B175',
    fontWeight: '500',
  },
  signupBtn: {
    backgroundColor: '#53B175',
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  signupBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  footerText: {
    fontSize: 14,
    color: '#181725',
    fontWeight: '600',
  },
});