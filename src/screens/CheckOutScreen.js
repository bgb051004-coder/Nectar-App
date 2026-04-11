import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { X, ChevronRight } from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext';
import { CartContext } from '../context/CartContext';

const COLORS = {
  green: '#53B175',
  black: '#181725',
  gray: '#7C7C7C',
  border: '#E2E2E2',
  white: '#FFFFFF',
};

export default function CheckOutScreen({ navigation, route }) {
  const { totalAmount = "0.00" } = route.params || {};

  const { addOrder } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext); 

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert("Giỏ hàng trống", "Vui lòng thêm sản phẩm trước khi thanh toán.");
      return;
    }

    const newOrder = {
      id: `#OD${Math.floor(Math.random() * 100000)}`, // Tạo mã đơn ngẫu nhiên
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'Processing',
      total: parseFloat(totalAmount),
      items: cartItems.length,
      color: '#F8A44C', // Màu cam cho trạng thái đang xử lý
    };

    // 1. Lưu vào lịch sử đơn hàng
    addOrder(newOrder);

    // 2. Xóa giỏ hàng
    clearCart();

    // 3. Thông báo và chuyển hướng
    Alert.alert(
      "Thành công", 
      "Đơn hàng của bạn đã được ghi lại!",
      [{ text: "Xem lịch sử", onPress: () => navigation.navigate('OrderHistory') }]
    );
  };

  const CheckoutItem = ({ label, value }) => (
    <View style={styles.checkoutItem}>
      <Text style={styles.checkoutLabel}>{label}</Text>
      <View style={styles.checkoutRight}>
        <Text style={styles.checkoutValue}>{value}</Text>
        <ChevronRight color={COLORS.black} size={20} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 1. Phần nền mờ - bấm vào để quay lại */}
      <Pressable style={styles.overlay} onPress={() => navigation.goBack()} />

      {/* 2. Nội dung chính chiếm 75% */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Checkout</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <X color={COLORS.black} size={25} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <CheckoutItem label="Delivery" value="Select Method" />
          <CheckoutItem label="Payment" value="Credit Card" />
          <CheckoutItem label="Promo Code" value="Pick Discount" />
          <CheckoutItem label="Total Cost" value={`$${totalAmount}`} />
          
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By placing an order you agree to our{' '}
              <Text style={styles.termsHighlight}>Terms And Conditions</Text>
            </Text>
          </View>
        </ScrollView>

        <TouchableOpacity 
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >  
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end' }, // Quan trọng
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    height: '62%', 
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingBottom: 40,
    
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 10,
  },
  sheetTitle: { fontSize: 24, fontWeight: 'bold' },
  checkoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  checkoutLabel: { fontSize: 18, color: COLORS.gray },
  checkoutRight: { flexDirection: 'row', alignItems: 'center' },
  checkoutValue: { fontWeight: '600', marginRight: 10 },
  placeOrderButton: {
    backgroundColor: COLORS.green,
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  placeOrderText: { color: COLORS.white, fontSize: 18, fontWeight: '600' },
  termsContainer: { marginTop: 20 },
  termsText: { color: COLORS.gray, fontSize: 14 },
  termsHighlight: { color: COLORS.black, fontWeight: 'bold' }
});