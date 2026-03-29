import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Plus, SlidersHorizontal } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 55) / 2; // Chia 2 cột cân đối

const COLORS = {
  green: '#53B175',
  black: '#181725',
  gray: '#7C7C7C',
  border: '#E2E2E2',
  white: '#FFFFFF',
};

// Dữ liệu mẫu cho đồ uống
const BEVERAGES_DATA = [
  { id: '1', name: 'Diet Coke', unit: '355ml, Price', price: '$1.99', image: 'https://cdn-icons-png.flaticon.com/512/3075/3075913.png' },
  { id: '2', name: 'Sprite Can', unit: '325ml, Price', price: '$1.50', image: 'https://cdn-icons-png.flaticon.com/512/822/822216.png' },
  { id: '3', name: 'Apple & Grape Juice', unit: '2L, Price', price: '$15.99', image: 'https://cdn-icons-png.flaticon.com/512/3076/3076041.png' },
  { id: '4', name: 'Orange Juice', unit: '2L, Price', price: '$8.99', image: 'https://cdn-icons-png.flaticon.com/512/2442/2442006.png' },
  { id: '5', name: 'Coca Cola Can', unit: '325ml, Price', price: '$4.99', image: 'https://cdn-icons-png.flaticon.com/512/3075/3075896.png' },
  { id: '6', name: 'Pepsi Can', unit: '330ml, Price', price: '$4.99', image: 'https://cdn-icons-png.flaticon.com/512/822/822237.png' },
];

export default function BeveragesScreen({ navigation }) {
  
  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productUnit}>{item.unit}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus color={COLORS.white} size={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.black} size={30} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beverages</Text>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal color={COLORS.black} size={22} />
        </TouchableOpacity>
      </View>

      {/* Grid Danh sách sản phẩm */}
      <FlatList
        data={BEVERAGES_DATA}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.black },
  backButton: { width: 40 },
  filterButton: { width: 40, alignItems: 'flex-end' },

  // List styles
  listContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 15 },

  // Card styles
  card: {
    width: COLUMN_WIDTH,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 15,
    backgroundColor: COLORS.white,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  infoContainer: { height: 60, justifyContent: 'flex-start' },
  productName: { fontSize: 16, fontWeight: 'bold', color: COLORS.black },
  productUnit: { fontSize: 14, color: COLORS.gray, marginTop: 3 },
  
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  productPrice: { fontSize: 18, fontWeight: 'bold', color: COLORS.black },
  addButton: {
    backgroundColor: COLORS.green,
    width: 45,
    height: 45,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
});