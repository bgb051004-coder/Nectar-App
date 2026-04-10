import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Store, 
  Search as ExploreIcon, 
  ShoppingCart, 
  Heart, 
  User 
} from 'lucide-react-native';

// 1. Import dữ liệu từ data.js
import { PRODUCTS } from '../data/data';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 2;

const COLORS = {
  green: '#53B175',
  black: '#181725',
  gray: '#7C7C7C',
  border: '#E2E2E2',
  white: '#FFFFFF',
};

// 2. Định nghĩa màu sắc và icon cho từng loại danh mục (để giao diện đẹp như mẫu)
const CATEGORY_STYLES = {
  'Fruits': { bgColor: '#EEF8F2', borderColor: '#53B175', image: require('../../assets/images/fruits.png') },
  'Beverages': { bgColor: '#EDF7FC', borderColor: '#B7DFF5', image: require('../../assets/images/beverages.png') },
  'Dairy': { bgColor: '#FFF9E5', borderColor: '#FDE598', image: require('../../assets/images/dairy.png') },
  // Thêm các category khác nếu data.js của bạn có thêm
};

export default function ExploreScreen({ navigation }) {
  
  // 3. Xử lý lấy danh sách danh mục không trùng lặp từ PRODUCTS
  const uniqueCategories = Array.from(new Set(PRODUCTS.map(item => item.category))).map(catName => {
    // Lấy style đã định nghĩa ở trên, nếu không có thì dùng màu mặc định
    const style = CATEGORY_STYLES[catName] || { 
      bgColor: '#F2F3F2', 
      borderColor: '#E2E2E2', 
      image: require('../../assets/images/fruits.png')
    };
    return {
      name: catName,
      ...style
    };
  });

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { backgroundColor: item.bgColor, borderColor: item.borderColor }]}
      onPress={() => {
        // Điều hướng sang trang sản phẩm của danh mục đó
        navigation.navigate('Beverages', { category: item.name });
      }}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Nội dung chính */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Products</Text>
      </View>

      {/* Thanh Search điều hướng sang SearchScreen */}
      <TouchableOpacity
        activeOpacity={0.8}  
        style={styles.searchContainer} 
        onPress={() => navigation.navigate('Search')}
      >
        <Search color={COLORS.black} size={20} />
        <View style={styles.fakeInput}>
           <Text style={styles.searchPlaceholder}>Search Store</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={uniqueCategories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.name}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
        columnWrapperStyle={styles.columnWrapper}
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <TabItem icon={<Store color={COLORS.black} size={24} />} label="Shop" onPress={() => navigation.navigate('Home')} />
        <TabItem icon={<ExploreIcon color={COLORS.green} size={24} />} label="Explore" active />
        <TabItem icon={<ShoppingCart color={COLORS.black} size={24} />} label="Cart" onPress={() => navigation.navigate('Cart')} />
        <TabItem icon={<Heart color={COLORS.black} size={24} />} label="Favourite" onPress={() => navigation.navigate('Favourite')} />
        <TabItem icon={<User color={COLORS.black} size={24} />} label="Account" onPress={() => navigation.navigate('Account')} />
      </View>
    </SafeAreaView>
  );
}

// Component phụ cho Tab (Dùng chung style với Home)
const TabItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
    {icon}
    <Text style={[styles.tabLabel, active && { color: COLORS.green }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.black },
  
  searchContainer: {
    backgroundColor: '#F2F3F2',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  fakeInput: { flex: 1, marginLeft: 10 },
  searchPlaceholder: { fontSize: 16, color: COLORS.gray },
  listPadding: { paddingHorizontal: 20, paddingBottom: 110 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 15 },
  
  categoryCard: {
    width: COLUMN_WIDTH,
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: { width: 100, height: 80, resizeMode: 'contain', marginBottom: 15 },
  categoryName: { fontSize: 16, fontWeight: 'bold', color: COLORS.black, textAlign: 'center' },

  // Footer Styles (Copy y hệt từ HomeScreen)
  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 85, 
    backgroundColor: COLORS.white, flexDirection: 'row', justifyContent: 'space-around', 
    alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.border, paddingBottom: 15 
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, fontWeight: '600', marginTop: 4, color: COLORS.black }
});