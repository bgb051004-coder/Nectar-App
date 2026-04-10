import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function VerificationScreen({ navigation }) {
  const [code, setCode] = useState('');
  const inputRef = useRef(null);

  // Tự động hiện bàn phím khi vào trang
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleTextChange = (text) => {
    // Chỉ cho phép nhập số và tối đa 4 ký tự
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 4) {
      setCode(cleaned);
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
        {/* Nút quay lại */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft color="#030303" size={30} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Enter your 4-digit code</Text>
          
          <Text style={styles.label}>Code</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="- - - -"
              keyboardType="numeric"
              value={code}
              onChangeText={handleTextChange}
              maxLength={4}
              letterSpacing={20} // Tạo khoảng cách giữa các con số
            />
          </View>
        </View>

        {/* Phần Footer chứa Resend Code và Nút tiếp tục */}
        <View style={styles.footer}>
          <TouchableOpacity 
            onPress={() => console.log("Gửi lại mã...")}
            activeOpacity={0.7}
          >
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.fab, 
              { backgroundColor: code.length === 4 ? '#53B175' : '#E2E2E2' }
            ]}
            disabled={code.length !== 4}
            onPress={() => navigation.navigate('Location')}
          >
            <ChevronRight color="#FFF" size={30} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  backButton: {
    padding: 20,
  },
  content: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#181725',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '500',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    marginTop: 10,
    width: '100%',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
  },
  footer: {
    flex: 1,
    flexDirection: 'row', // Sắp xếp ngang
    justifyContent: 'space-between', // Đẩy 2 thành phần về 2 phía
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
  resendText: {
    color: '#53B175',
    fontSize: 18,
    fontWeight: '500',
  },
  fab: {
    width: 67,
    height: 67,
    borderRadius: 33.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});