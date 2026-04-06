import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';

const COLORS = { green: '#53B175', black: '#181725', gray: '#7C7C7C', white: '#FFFFFF', border: '#E2E2E2' };

const CATEGORIES = ['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'];
const BRANDS = ['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farmas'];

export default function FilterScreen({ navigation }) {
  const [selectedCats, setSelectedCats] = useState(['Eggs']);
  const [selectedBrands, setSelectedBrands] = useState(['Cocola']);

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) setList(list.filter(i => i !== item));
    else setList([...list, item]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X color={COLORS.black} size={30} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Categories</Text>
        {CATEGORIES.map(cat => (
          <TouchableOpacity key={cat} style={styles.option} onPress={() => toggleSelection(cat, selectedCats, setSelectedCats)}>
            <View style={[styles.checkbox, selectedCats.includes(cat) && styles.checkboxActive]} />
            <Text style={[styles.optionText, selectedCats.includes(cat) && { color: COLORS.green }]}>{cat}</Text>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Brand</Text>
        {BRANDS.map(brand => (
          <TouchableOpacity key={brand} style={styles.option} onPress={() => toggleSelection(brand, selectedBrands, setSelectedBrands)}>
            <View style={[styles.checkbox, selectedBrands.includes(brand) && styles.checkboxActive]} />
            <Text style={[styles.optionText, selectedBrands.includes(brand) && { color: COLORS.green }]}>{brand}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Button Apply */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={() => navigation.goBack()}>
          <Text style={styles.applyButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 20, color: COLORS.black },
  content: { padding: 20 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.black, marginBottom: 15 },
  option: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: COLORS.gray, marginRight: 15 },
  checkboxActive: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  optionText: { fontSize: 16, color: COLORS.gray },
  footer: { padding: 20 },
  applyButton: { backgroundColor: COLORS.green, height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  applyButtonText: { color: COLORS.white, fontSize: 18, fontWeight: '600' }
});