import React, { useState, useContext } from 'react'; // Thêm useContext
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
import { Eye, EyeOff } from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext'; // Đảm bảo đúng đường dẫn

export default function LoginScreen({ navigation }) {
  // 1. Khai báo các State cần thiết
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  // 2. Lấy hàm login từ AuthContext
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      // Giả lập dữ liệu user và token (Sau này thay bằng gọi API)
      const mockToken = "12345";
      const user = { 
        email: email,
        username: email.split('@')[0] // Lấy phần trước @ làm tên tạm thời
      };
      
      // Gọi hàm login từ Context (Hàm này sẽ lưu vào AsyncStorage và đổi userToken)
      await login(user, mockToken); 
      
      console.log("Đăng nhập thành công");
      // Bạn không cần navigation.navigate vì AppNavigator sẽ tự đổi sang Home
    } catch (error) {
      Alert.alert("Lỗi", "Đăng nhập thất bại");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('../../assets/images/mask_group.png')} 
        style={styles.backgroundImage} 
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/carrot_orange.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>Logging</Text>
            <Text style={styles.subtitle}>Enter your email and password</Text>
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
                placeholder="example@gmail.com"
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
                  placeholder="••••••••"
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
              onPress={handleLogin}
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
} // Đóng đúng ngoặc function LoginScreen

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