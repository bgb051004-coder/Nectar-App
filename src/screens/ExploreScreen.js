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

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 2;

const COLORS = {
  green: '#53B175',
  black: '#181725',
  gray: '#7C7C7C',
  border: '#E2E2E2',
  white: '#FFFFFF',
};

const CATEGORIES = [
  { id: '1', name: 'Frash Fruits & Vegetable', image: 'https://cdn-icons-png.flaticon.com/512/2329/2329903.png', bgColor: '#EEF8F2', borderColor: '#53B175' },
  { id: '2', name: 'Cooking Oil & Ghee', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png', bgColor: '#FFF6EE', borderColor: '#F8A44C' },
  { id: '3', name: 'Meat & Fish', image: 'https://cdn-icons-png.flaticon.com/512/1041/1041300.png', bgColor: '#FDE8E4', borderColor: '#F7A593' },
  { id: '4', name: 'Bakery & Snacks', image: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png', bgColor: '#F4EBF7', borderColor: '#D3B0E0' },
  { id: '5', name: 'Dairy & Eggs', image: 'https://cdn-icons-png.flaticon.com/512/2674/2674067.png', bgColor: '#FFF9E5', borderColor: '#FDE598' },
  { id: '6', name: 'Beverages', image: 'https://cdn-icons-png.flaticon.com/512/2405/2405479.png', bgColor: '#EDF7FC', borderColor: '#B7DFF5' },
];

export default function ExploreScreen({ navigation }) {
  
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { backgroundColor: item.bgColor, borderColor: item.borderColor }]}
      onPress={() => {
        if(item.name === 'Beverages') {
          navigation.navigate('Beverages');
        }
      }}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Nội dung chính */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Products</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search color={COLORS.black} size={20} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search Store" 
          placeholderTextColor={COLORS.gray}
        />
      </View>

      <FlatList
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
        columnWrapperStyle={styles.columnWrapper}
      />

      {/* FOOTER ĐIỀU HƯỚNG (Giống HomeScreen) */}
      <View style={styles.footer}>
        <TabItem 
          icon={<Store color={COLORS.black} size={24} />} 
          label="Shop" 
          onPress={() => navigation.navigate('Home')} 
        />
        <TabItem 
          icon={<ExploreIcon color={COLORS.green} size={24} />} 
          label="Explore" 
          active 
        />
        <TabItem 
          icon={<ShoppingCart color={COLORS.black} size={24} />} 
          label="Cart" 
          onPress={() => navigation.navigate('Cart')} 
        />
        <TabItem 
          icon={<Heart color={COLORS.black} size={24} />} 
          label="Favourite" 
          onPress={() => navigation.navigate('Favourite')} 
        />
        <TabItem 
          icon={<User color={COLORS.black} size={24} />} 
          label="Account" 
          onPress={() => navigation.navigate('Account')} 
        />
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
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: COLORS.black },
  
  listPadding: { paddingHorizontal: 20, paddingBottom: 110 }, // Padding lớn để ko bị footer che
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