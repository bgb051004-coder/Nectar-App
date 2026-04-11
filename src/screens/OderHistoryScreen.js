import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ChevronRight
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight as ArrowIcon, Package } from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext';

export default function OrderHistoryScreen() {
  const { orders } = useContext(AuthContext);
  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderCard} activeOpacity={0.7}>
      <View style={styles.orderHeader}>
        <View style={styles.idContainer}>
          <Package size={20} color="#53B175" />
          <Text style={styles.orderId}>{item.id}</Text>
        </View>
        <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
      </View>

      <View style={styles.orderBody}>
        <Text style={styles.orderDate}>Date: {item.date}</Text>
        <Text style={styles.orderItems}>{item.items} items</Text>
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalPrice}>${item.total.toFixed(2)}</Text>
        <ArrowIcon size={20} color="#181725" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
  },
  listContent: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#181725',
  },
  statusText: {
    fontWeight: '600',
    fontSize: 14,
  },
  orderBody: {
    marginBottom: 10,
  },
  orderDate: {
    color: '#7C7C7C',
    fontSize: 14,
  },
  orderItems: {
    color: '#7C7C7C',
    fontSize: 14,
    marginTop: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    paddingTop: 10,
  },
  totalLabel: {
    flex: 1,
    fontSize: 14,
    color: '#181725',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginRight: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#7C7C7C',
  }
});