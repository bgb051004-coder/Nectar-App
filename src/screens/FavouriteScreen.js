import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Store, Search as ExploreIcon, ShoppingCart, Heart, User } from 'lucide-react-native';

const COLORS = {
  green: '#53B175',
  black: '#181725',
  gray: '#7C7C7C',
  border: '#E2E2E2',
  white: '#FFFFFF',
};

const INITIAL_FAVOURITES = [
  { id: '1', name: 'Sprite Can', unit: '325ml, Price', price: '$1.50', image: 'https://cdn-icons-png.flaticon.com/512/822/822216.png' },
  { id: '2', name: 'Diet Coke', unit: '355ml, Price', price: '$1.99', image: 'https://cdn-icons-png.flaticon.com/512/3075/3075913.png' },
  { id: '3', name: 'Apple & Grape Juice', unit: '2L, Price', price: '$15.99', image: 'https://cdn-icons-png.flaticon.com/512/3076/3076041.png' },
  { id: '4', name: 'Coca Cola Can', unit: '325ml, Price', price: '$4.99', image: 'https://cdn-icons-png.flaticon.com/512/3075/3075896.png' },
];

export default function FavouriteScreen({ navigation }) {
  const [favorites, setFavorites] = useState(INITIAL_FAVOURITES);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemUnit}>{item.unit}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <ChevronRight color={COLORS.black} size={20} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View style={styles.footerAction}>
        <TouchableOpacity style={styles.addAllButton}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Navigation - Đảm bảo đồng bộ */}
      <View style={styles.footerNav}>
        <TabItem icon={<Store color={COLORS.black} size={24} />} label="Shop" onPress={() => navigation.navigate('Home')} />
        <TabItem icon={<ExploreIcon color={COLORS.black} size={24} />} label="Explore" onPress={() => navigation.navigate('Explore')} />
        <TabItem icon={<ShoppingCart color={COLORS.black} size={24} />} label="Cart" onPress={() => navigation.navigate('Cart')} />
        <TabItem icon={<Heart color={COLORS.green} size={24} />} label="Favourite" active />
        <TabItem icon={<User color={COLORS.black} size={24} />} label="Account" onPress={() => navigation.navigate('Account')} />
      </View>
    </SafeAreaView>
  );
}

const TabItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
    {icon}
    <Text style={[styles.tabLabel, active && { color: COLORS.green }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { paddingVertical: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.black },
  listContent: { paddingHorizontal: 25, paddingBottom: 100 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20 },
  itemImage: { width: 60, height: 60, resizeMode: 'contain' },
  itemInfo: { flex: 1, marginLeft: 20 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: COLORS.black },
  itemUnit: { fontSize: 14, color: COLORS.gray, marginTop: 3 },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginRight: 10 },
  separator: { height: 1, backgroundColor: COLORS.border },
  footerAction: { paddingHorizontal: 25, paddingBottom: 100, paddingTop: 20 },
  addAllButton: { backgroundColor: COLORS.green, height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  addAllText: { color: COLORS.white, fontSize: 18, fontWeight: '600' },
  footerNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 85, backgroundColor: COLORS.white, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.border, paddingBottom: 15 },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, fontWeight: '600', marginTop: 4, color: COLORS.black }
});