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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff } from 'lucide-react-native'; // Thư viện icon bạn đang dùng

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('imshuvo97@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [secureText, setSecureText] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Background mờ ảo như file Mask Group.png */}
      <Image 
        source={require('../../assets/mask_group.png')} 
        style={styles.backgroundImage} 
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Logo củ cà rốt (từ Splash Screen) */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/carrot_orange.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>Loging</Text>
            <Text style={styles.subtitle}>Enter your emails and password</Text>
          </View>

          <View style={styles.form}>
            {/* Input Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Input Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrapper}>
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

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.loginBtn}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.loginBtnText}>Log In</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.footerText}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupText}>Sign Up</Text>
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
    marginBottom: 30,
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
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
    width: '100%',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: -10,
  },
  forgotText: {
    color: '#181725',
    fontSize: 14,
  },
  loginBtn: {
    backgroundColor: '#53B175',
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  loginBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  footerText: {
    fontSize: 14,
    color: '#181725',
    fontWeight: '600',
  },
  signupText: {
    fontSize: 14,
    color: '#53B175',
    fontWeight: '600',
  },
});