import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { X } from 'lucide-react-native';

const COLORS = {
  black: '#181725',
  gray: '#7C7C7C',
  white: '#FFFFFF',
  green: '#53B175',
};

export default function ErrorScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 1. Lớp nền mờ phủ kín màn hình */}
      <Pressable style={styles.overlay} onPress={() => navigation.goBack()} />
      
      {/* 2. Hộp thoại thông báo */}
      <View style={styles.errorBox}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => navigation.goBack()}
        >
          <X color={COLORS.black} size={25} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Image 
            source={require('../../assets/images/order_failed.png')} 
            style={styles.image} 
          />
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>Oops! Order Failed</Text>
            <Text style={styles.subtitle}>
              Something went wrong.{'\n'}Please check your payment method{'\n'}or try again later.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => navigation.replace('OrderAccepted')} 
          >
            <Text style={styles.retryButtonText}>Please Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'transparent', // Giữ trong suốt để thấy màn hình dưới
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  errorBox: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    // Đổ bóng để hộp thoại nổi bật
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  content: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },
  footer: {
    width: '100%', // Nút bấm chiếm hết chiều ngang hộp thoại
    marginTop: 20,
  },
  retryButton: {
    backgroundColor: COLORS.green, 
    height: 60,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '600',
  },
});