import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';

const COLORS = {
  green: '#53B175',
  black: '#181725',
  gray: '#7C7C7C',
  white: '#FFFFFF',
};

export default function OrderAcceptedScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('../../assets/images/mask_group.png')} 
        style={StyleSheet.absoluteFill} 
      />  
      <View style={styles.content}>
        {/* Biểu tượng thành công */}
        <View style={styles.iconContainer}>
            <Image 
                source={require('../../assets/images/order_accepted.png')} 
                style={styles.image} 
            />
        </View>

        <View style={styles.textContainer}>
            <Text style={styles.title}>Your Order has been{'\n'}accepted</Text>
            <Text style={styles.subtitle}>
                Your items has been placed and is on{'\n'}it’s way to being processed
            </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
            style={styles.trackButton}
            onPress={() => alert("Tracking Order...")}
        >
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 270,
    height: 240,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    lineHeight: 35,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 22,
  },
  footer: {
    paddingBottom: 40,
  },
  trackButton: {
    backgroundColor: COLORS.green,
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  trackButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    height: 67,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '600',
  },
});