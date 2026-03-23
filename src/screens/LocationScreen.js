import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronDown } from 'lucide-react-native';

export default function LocationScreen({ navigation }) {
  const [zone, setZone] = useState('');
  const [area, setArea] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/mask_group.png')}
        style={styles.backgroundImage}
      />
      {/* Nút quay lại */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft color="#030303" size={30} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hình minh họa */}
        <Image 
          source={require('../../assets/illustration.png')} 
          style={styles.illustration}
          resizeMode="contain"
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>Select Your Location</Text>
          <Text style={styles.subtitle}>
            Swith on your location to stay in tune with {"\n"}whats happening in your area
          </Text>
        </View>

        {/* Form chọn vị trí */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Zone</Text>
            <TouchableOpacity style={styles.pickerField}>
              <Text style={styles.pickerText}>
                {zone || "Select your zone"}
              </Text>
              <ChevronDown color="#7C7C7C" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Area</Text>
            <TouchableOpacity style={styles.pickerField}>
              <Text style={styles.pickerText}>
                {area || "Types of your area"}
              </Text>
              <ChevronDown color="#7C7C7C" size={20} />
            </TouchableOpacity>
          </View>

          {/* Nút Submit */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => navigation.navigate('LogIn')} // Hoặc chuyển đến Home
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  backButton: {
    padding: 20,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  illustration: {
    width: 220,
    height: 170,
    marginTop: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#181725',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },
  form: {
    width: '100%',
    marginTop: 80,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600',
    marginBottom: 10,
  },
  pickerField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 15,
  },
  pickerText: {
    fontSize: 18,
    color: '#181725',
  },
  submitButton: {
    backgroundColor: '#53B175',
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});