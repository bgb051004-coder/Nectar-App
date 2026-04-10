import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ShoppingBag, 
  IdCard, 
  MapPin, 
  CreditCard, 
  Ticket, 
  Bell, 
  CircleHelp, 
  Info, 
  LogOut,
  ChevronRight 
} from 'lucide-react-native';

const COLORS = {
  green: '#53B175',
  black: '#181725',
  gray: '#7C7C7C',
  border: '#E2E2E2',
  white: '#FFFFFF',
  red: '#F3603F',
  lightGray: '#F2F3F2'
};

export default function AccountScreen({ navigation }) {
  
  // Thành phần con cho mỗi dòng trong danh sách
  const MenuItem = ({ icon: Icon, label, onPress, showBorder = true, color = COLORS.black }) => (
    <TouchableOpacity 
      style={[styles.menuItem, showBorder && styles.borderBottom]} 
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <Icon color={color} size={22} />
        <Text style={[styles.menuLabel, { color: color }]}>{label}</Text>
      </View>
      <ChevronRight color={COLORS.black} size={20} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image 
            source={require('../../assets/images/avatar.png')}
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>Afsar Hossen</Text>
              <TouchableOpacity>
                <IdCard color={COLORS.green} size={18} />
              </TouchableOpacity>
            </View>
            <Text style={styles.userEmail}>Imshuvo97@gmail.com</Text>
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.menuSection}>
          <MenuItem icon={ShoppingBag} label="Orders" onPress={() => {}} />
          <MenuItem icon={IdCard} label="My Details" onPress={() => {}} />
          <MenuItem icon={MapPin} label="Delivery Address" onPress={() => {}} />
          <MenuItem icon={CreditCard} label="Payment Methods" onPress={() => {}} />
          <MenuItem icon={Ticket} label="Promo Card" onPress={() => {}} />
          <MenuItem icon={Bell} label="Notifications" onPress={() => {}} />
          <MenuItem icon={CircleHelp} label="Help" onPress={() => {}} />
          <MenuItem icon={Info} label="About" onPress={() => {}} />
        </View>

        {/* Log Out Button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => navigation.replace('LogIn')}
          >
            <LogOut color={COLORS.green} size={22} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 27,
  },
  profileInfo: {
    marginLeft: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginRight: 10,
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 4,
  },
  menuSection: {
    paddingHorizontal: 25,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  footer: {
    padding: 25,
    paddingBottom: 40,
  },
  logoutButton: {
    backgroundColor: COLORS.lightGray,
    height: 67,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.green,
    marginLeft: 10,
  },
});