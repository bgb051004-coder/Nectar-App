import React, { useContext } from 'react'; // Bỏ useState, useEffect không dùng
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Minus, Plus } from 'lucide-react-native';

// QUAN TRỌNG: Import CartContext từ file của bạn
import { CartContext } from '../context/CartContext'; 

const COLORS = {
  green: '#53B175',
  black: '#181725',
  gray: '#7C7C7C',
  border: '#E2E2E2',
  white: '#FFFFFF',
};

export default function CartScreen({ navigation }) {
  // Lấy dữ liệu và các hàm điều khiển từ Context
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);

  // Hàm tính tổng tiền dựa trên cartItems từ Context
  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <X color={COLORS.gray} size={20} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.itemUnit}>{item.unit}</Text>
        
        <View style={styles.itemFooter}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.qtyButton} 
              onPress={() => updateQuantity(item.id, -1)}
            >
              {/* Nếu quantity = 1 thì đổi màu icon Minus để báo hiệu không giảm được nữa */}
              <Minus color={item.quantity > 1 ? COLORS.green : COLORS.gray} size={18} />
            </TouchableOpacity>
            
            <Text style={styles.qtyText}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.qtyButton} 
              onPress={() => updateQuantity(item.id, 1)}
            >
              <Plus color={COLORS.green} size={18} />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()} // Đảm bảo key là string
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        }
      />

      {/* Chỉ hiện Footer/Nút Checkout khi có hàng trong giỏ */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout', { totalAmount: getTotalPrice() })}
          >
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.priceBadge}>
              <Text style={styles.priceBadgeText}>${getTotalPrice()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 100 },
  emptyText: { color: COLORS.gray, fontSize: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.black },
  listContent: { paddingHorizontal: 25, paddingBottom: 100 },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 25,
    alignItems: 'center',
  },
  itemImage: { width: 70, height: 70, resizeMode: 'contain' },
  itemDetails: { flex: 1, marginLeft: 20 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: COLORS.black },
  itemUnit: { fontSize: 14, color: COLORS.gray, marginTop: 3 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: {
    width: 45,
    height: 45,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: { fontSize: 16, fontWeight: '600', marginHorizontal: 15 },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: COLORS.black },
  separator: { height: 1, backgroundColor: COLORS.border },
  emptyText: { textAlign: 'center', marginTop: 50, color: COLORS.gray, fontSize: 16 },
  
  footer: { paddingHorizontal: 25, paddingBottom: 25 },
  checkoutButton: {
    backgroundColor: COLORS.green,
    height: 67,
    borderRadius: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  checkoutText: { color: COLORS.white, fontSize: 18, fontWeight: '600' },
  priceBadge: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#489E67',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priceBadgeText: { color: COLORS.white, fontSize: 12, fontWeight: '600' }
});