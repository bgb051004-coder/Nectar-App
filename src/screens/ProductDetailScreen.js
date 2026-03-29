import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Share, Minus, Plus, ChevronRight, Star } from 'lucide-react-native';

const COLORS = {
  green: '#53B175',
  black: '#181725',
  gray: '#7C7C7C',
  border: '#E2E2E2',
  white: '#FFFFFF',
  background: '#F2F3F2'
};

export default function ProductDetailScreen({ navigation }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. Header & Image Section */}
        <View style={styles.imageContainer}>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeft color={COLORS.black} size={30} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Share color={COLORS.black} size={24} />
            </TouchableOpacity>
          </View>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2907/2907444.png' }} 
            style={styles.productImage} 
          />
        </View>

        {/* 2. Content Section */}
        <View style={styles.contentContainer}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.productName}>Naturel Fresh Apple</Text>
              <Text style={styles.productUnit}>1kg, Price</Text>
            </View>
            <TouchableOpacity>
              <Star color={COLORS.gray} size={24} />
            </TouchableOpacity>
          </View>

          {/* 3. Quantity & Price */}
          <View style={[styles.rowBetween, { marginTop: 30 }]}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                style={styles.quantityButton}
              >
                <Minus color={quantity > 1 ? COLORS.green : COLORS.gray} size={25} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
              >
                <Plus color={COLORS.green} size={25} />
              </TouchableOpacity>
            </View>
            <Text style={styles.productPrice}>$4.99</Text>
          </View>

          <View style={styles.divider} />

          {/* 4. Expandable Detail Section */}
          <TouchableOpacity style={styles.detailHeader}>
            <Text style={styles.detailTitle}>Product Detail</Text>
            <ChevronRight color={COLORS.black} size={20} />
          </TouchableOpacity>
          <Text style={styles.detailDescription}>
            Apples are nutritious. Apples may be good for weight loss. apples may be good for your heart. As part of a healthful and varied diet.
          </Text>

          <View style={styles.divider} />

          {/* 5. Nutrition & Review */}
          <TouchableOpacity style={styles.detailHeader}>
            <Text style={styles.detailTitle}>Nutritions</Text>
            <View style={styles.row}>
              <View style={styles.nutritionBadge}>
                <Text style={styles.nutritionText}>100gr</Text>
              </View>
              <ChevronRight color={COLORS.black} size={20} />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.detailHeader}>
            <Text style={styles.detailTitle}>Review</Text>
            <View style={styles.row}>
              <View style={styles.row}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} color="#F3603F" size={15} fill="#F3603F" />
                ))}
              </View>
              <ChevronRight color={COLORS.black} size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 6. Add To Basket Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  imageContainer: {
    height: 300,
    backgroundColor: COLORS.background,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  headerButtons: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10
  },
  productImage: { width: '80%', height: '70%', resizeMode: 'contain' },
  contentContainer: { padding: 25 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  productName: { fontSize: 24, fontWeight: 'bold', color: COLORS.black },
  productUnit: { fontSize: 16, color: COLORS.gray, marginTop: 5 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { padding: 5 },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15
  },
  productPrice: { fontSize: 24, fontWeight: 'bold', color: COLORS.black },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 20 },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailTitle: { fontSize: 16, fontWeight: '600', color: COLORS.black },
  detailDescription: { fontSize: 13, color: COLORS.gray, marginTop: 10, lineHeight: 21 },
  nutritionBadge: { backgroundColor: '#EBEBEB', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5, marginRight: 10 },
  nutritionText: { fontSize: 10, color: COLORS.gray },
  footer: { padding: 25, paddingBottom: 40 },
  addButton: {
    backgroundColor: COLORS.green,
    borderRadius: 19,
    height: 67,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: { color: COLORS.white, fontSize: 18, fontWeight: '600' }
});