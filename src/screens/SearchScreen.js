import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, SlidersHorizontal, Plus } from 'lucide-react-native';
import { PRODUCTS } from '../data/data';

const COLORS = {
  green: '#53B175',
  black: '#181725',
  gray: '#7C7C7C',
  border: '#E2E2E2',
  white: '#FFFFFF',
  lightGray: '#F2F3F2',
};

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filteredResults, setFilteredResults] = useState(PRODUCTS);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredResults(PRODUCTS); // Nếu trống thì hiện tất cả hoặc để trống tùy bạn
    } else {
      const filtered = PRODUCTS.filter(item => 
        item.name.toLowerCase().includes(searchText.toLowerCase()) || 
        item.category.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchText]);

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.resultItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemUnit}>{item.unit}</Text>
      </View>
      <View style={styles.itemPriceAction}>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton}>
            <Plus color={COLORS.white} size={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search Store"
            autoFocus={true}
          />
          <TouchableOpacity onPress={() => setSearchText('')}>
            <X color={COLORS.gray} size={20} style={styles.clearIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal color={COLORS.black} size={22} />
        </TouchableOpacity>
      </View>

      {/* Results List */}
      <FlatList
        data={filteredResults}
        renderItem={renderSearchItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style = {styles.emptyText}>No products found</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBox: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.lightGray,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
  clearIcon: { marginLeft: 5 },
  filterButton: {
    marginLeft: 15,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 20,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  itemUnit: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 3,
  },
  itemPriceAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginRight: 15,
  },
  addButton: {
    backgroundColor: COLORS.green,
    width: 35,
    height: 35,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  emptyText: { textAlign: 'center', marginTop: 50, color: COLORS.gray, fontSize: 16 }
});