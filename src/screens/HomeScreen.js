import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  MapPin, 
  Store, 
  Search as ExploreIcon, 
  ShoppingCart, 
  Heart, 
  User 
} from 'lucide-react-native';
import { PRODUCTS } from '../data/data';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 40;

const COLORS = {
  green: '#53B175',
  black: '#181725',
  gray: '#7C7C7C',
  lightGray: '#F2F3F2',
  border: '#E2E2E2',
  white: '#FFFFFF',
  orangePastel: '#FEF1E4',
  greenPastel: '#E5F3EA',
  bluePastel: '#E1EDFA'
};

const BANNERS = [
  { id: 'b1', title: 'Fresh Vegetables', subtitle: 'Get Up To 40% OFF', color: COLORS.greenPastel },
  { id: 'b2', title: 'Summer Fruits', subtitle: 'Get Up To 30% OFF', color: COLORS.orangePastel },
  { id: 'b3', title: 'Dairy Products', subtitle: 'Get Up To 20% OFF', color: COLORS.bluePastel },
];

const GROCERY_STYLE_MAP = {
  'Pulses': { bgColor: '#F8A44C20', image: require('../../assets/images/dairy.png') },
  'Rice': { bgColor: '#53B17520', image: require('../../assets/images/dairy.png') },
  'Dairy': { bgColor: '#F7A59320', image: require('../../assets/images/dairy.png') },
};
export default function HomeScreen({ navigation }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const exclusiveOffers = PRODUCTS.filter(item => item.isExclusive);
  const bestSelling = PRODUCTS.filter(item => item.isBestSelling);
  const groceryCategories = Array.from(new Set(
    PRODUCTS
      .filter(item => item.category !== 'Fruits' && item.category !== 'Beverages')
      .map(item => item.category)
  )).map(catName => ({
    name: catName,
    ...(GROCERY_STYLE_MAP[catName] || { bgColor: '#F2F3F2', image: require('../../assets/images/fruits.png') })
  }));

  const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index);
  }).current;

  // CẬP NHẬT: Thêm onPress để chuyển sang trang ProductDetail
  const ProductCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.productUnit}>{item.unit}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/carrot_orange.png')} style={styles.logoMini} />
          <View style={styles.locationContainer}>
            <MapPin color="#4C4C4C" size={18} />
            <Text style={styles.locationText}>Dhaka, Banasree</Text>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
           style={styles.searchContainer}
           activeOpacity={0.8}
           onPress={() => navigation.navigate('Search')}
        >
          <Search color={COLORS.black} size={20} />
          <View style={styles.fakeInput}>
            <Text style={styles.searchPlaceholder}>Search Store</Text>
          </View>
        </TouchableOpacity>

        {/* CẬP NHẬT: Banner có ảnh minh họa trái/phải */}
        <View style={styles.bannerWrapper}>
          <FlatList
            data={BANNERS}
            renderItem={({ item }) => (
              <View style={[styles.bannerSlide, { backgroundColor: item.color }]}>
                {/* Ảnh minh họa giả lập Nectar */}
                <Image source={require('../../assets/images/banana.png')} style={styles.bannerDecorLeft} />
                <View style={styles.bannerTextContent}>
                  <Text style={styles.bannerMainTitle}>{item.title}</Text>
                  <Text style={styles.bannerSubTitle}>{item.subtitle}</Text>
                </View>
                <Image source={require('../../assets/images/banana.png')} style={styles.bannerDecorRight} />
              </View>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.paginationDots}>
            {BANNERS.map((_, index) => (
              <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
            ))}
          </View>
        </View>

        <SectionHeader title="Exclusive Offer" />
        <FlatList
          horizontal
          data={exclusiveOffers}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
        />

        <SectionHeader title="Best Selling" />
        <FlatList
          horizontal
          data={bestSelling}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
        />

        <SectionHeader title="Groceries" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listPadding}>
          {groceryCategories.map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.catCard, { backgroundColor: cat.bgColor }]}>
              <Image source={cat.image} style={styles.catImage} />
              <Text style={styles.catName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          horizontal
          data={PRODUCTS}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={item => "g_list_" + item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.listPadding, { marginTop: 20 }]}
        />
      </ScrollView>

      {/* CẬP NHẬT: Footer có chức năng điều hướng */}
      <View style={styles.footer}>
        <TabItem 
          icon={<Store color={COLORS.green} size={24} />} 
          label="Shop" active 
          onPress={() => navigation.navigate('Home')}
        />
        <TabItem 
          icon={<ExploreIcon color={COLORS.black} size={24} />} 
          label="Explore" 
          onPress={() => navigation.navigate('Explore')}
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

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
  </View>
);

// CẬP NHẬT: Component TabItem nhận prop onPress
const TabItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
    {icon}
    <Text style={[styles.tabLabel, active && { color: COLORS.green }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scrollContent: { paddingBottom: 110 },
  header: { alignItems: 'center', marginTop: 10 },
  logoMini: { width: 30, height: 35, resizeMode: 'contain' },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  locationText: { fontSize: 18, fontWeight: '600', color: '#4C4C4C', marginLeft: 5 },
  searchContainer: { 
    backgroundColor: '#F2F3F2',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 5, 
    marginTop: 10,
  },
  fakeInput: { flex: 1, marginLeft: 10 },
  searchPlaceholder: { fontSize: 16, color: COLORS.gray },

  // Banner Styles Cập nhật
  bannerWrapper: { marginTop: 20, marginHorizontal: 20, height: 115, borderRadius: 15, overflow: 'hidden' },
  bannerSlide: { width: BANNER_WIDTH, height: '100%', flexDirection: 'row', alignItems: 'center', position: 'relative' },
  bannerDecorLeft: { position: 'absolute', left: 0, bottom: 0, width: 70, height: 90, resizeMode: 'contain' },
  bannerDecorRight: { position: 'absolute', right: 0, top: 0, width: 70, height: 90, resizeMode: 'contain' },
  bannerTextContent: { flex: 1, alignItems: 'center', zIndex: 5 },
  bannerMainTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.black, textAlign: 'center' },
  bannerSubTitle: { fontSize: 14, color: COLORS.green, fontWeight: '600', marginTop: 4, textAlign: 'center' },
  
  paginationDots: { position: 'absolute', bottom: 10, width: '100%', flexDirection: 'row', justifyContent: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D3D3D3', marginHorizontal: 3 },
  activeDot: { width: 15, backgroundColor: COLORS.green },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.black },
  seeAll: { color: COLORS.green, fontSize: 14, fontWeight: '600' },
  listPadding: { paddingLeft: 20 },
  card: { width: 160, borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 12, marginRight: 15 },
  productImage: { width: '100%', height: 70, resizeMode: 'contain' },
  productName: { fontSize: 15, fontWeight: 'bold', marginTop: 15, color: COLORS.black },
  productUnit: { color: COLORS.gray, fontSize: 12, marginTop: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  productPrice: { fontSize: 16, fontWeight: 'bold' },
  addButton: { backgroundColor: COLORS.green, width: 40, height: 40, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: COLORS.white, fontSize: 22 },
  catCard: { flexDirection: 'row', alignItems: 'center', width: 220, height: 90, borderRadius: 15, padding: 15, marginRight: 15 },
  catImage: { width: 60, height: 60, resizeMode: 'contain' },
  catName: { fontSize: 18, fontWeight: '600', color: '#3E423F', marginLeft: 12 },
  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 85, 
    backgroundColor: COLORS.white, flexDirection: 'row', justifyContent: 'space-around', 
    alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.border, paddingBottom: 15 
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, fontWeight: '600', marginTop: 4, color: COLORS.black }
});