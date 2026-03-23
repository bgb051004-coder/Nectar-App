import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function NumberScreen({ navigation }) {
  // 1. Khai báo State và Ref bên trong Component chính
  const [phoneNumber, setPhoneNumber] = useState('');
  const inputRef = useRef(null);

  // 2. Tự động hiện bàn phím
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 3. Hàm xử lý thay đổi text
  const handleTextChange = (text) => {
    setPhoneNumber(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/mask_group.png')}
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
          <Text style={styles.title}>Enter your mobile number</Text>
          
          <Text style={styles.label}>Mobile Number</Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.countryPicker}>
              <Image 
                source={{ uri: 'https://flagcdn.com/w40/vn.png' }} 
                style={styles.flag} 
              />
              <Text style={styles.countryCode}>+84</Text> 
            </View>

            <TextInput
              ref={inputRef} // Sử dụng ref đã khai báo ở trên
              style={styles.input}
              placeholder="Nhập số điện thoại"
              keyboardType="numeric"
              value={phoneNumber} // Sử dụng state đã khai báo ở trên
              onChangeText={handleTextChange}
            />
          </View>
        </View>

        {/* Nút mũi tên */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.fab, { backgroundColor: '#53B175' }]} 
            onPress={() => navigation.navigate('Verification')}
          >
            <ChevronRight color="#FFF" size={30} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Giữ nguyên phần styles bên dưới của bạn...
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    marginTop: 10,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  flag: {
    width: 30,
    height: 20,
    borderRadius: 4,
    marginRight: 10,
  },
  countryCode: {
    fontSize: 18,
    color: '#181725',
    fontWeight: '500',
  },
  input: {
    flex: 1,
    fontSize: 18,
    letterSpacing: 1,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 25,
    paddingBottom: 25,
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