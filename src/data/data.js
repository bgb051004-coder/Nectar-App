// data.js
export const PRODUCTS = [
  // Beverages
  { 
    id: '1', 
    name: 'Diet Coke', 
    unit: '355ml, Price', 
    price: 1.99, 
    category: 'Beverages',
    image: require('../../assets/images/banana.png') 
  },
  { 
    id: '2', 
    name: 'Sprite Can', 
    unit: '325ml, Price', 
    price: 1.50, 
    category: 'Beverages',
    image: require('../../assets/images/banana.png') 
  },
  // Fruits
  { 
    id: '3', 
    name: 'Organic Bananas', 
    unit: '7pcs, Price', 
    price: 4.99, 
    category: 'Fruits',
    isExclusive: true,
    image: require('../../assets/images/banana.png') 
  },
  { 
    id: '4', 
    name: 'Red Apple',
    unit: '1kg, Price', 
    price: 3.99, 
    category: 'Fruits',
    isExclusive: true,
    image: require('../../assets/images/apple.png') 
  },

  // Dairy
  { 
    id: '5', 
    name: 'Egg Red', 
    unit: '4pcs, Price', 
    price: 1.99, 
    category: 'Dairy',
    isBestSelling: true,
    image: require('../../assets/images/EggRed.png') 
  },
  {
    id: '6', 
    name: 'Egg Pasta', 
    unit: '30gm, Price', 
    price: 2.99, 
    category: 'Dairy',
    image: require('../../assets/images/EggPasta.png') 
  }
];
export const ORDERS = [
  {
    id: '#OD12345',
    date: '10/04/2026',
    status: 'Delivered',
    total: 35.50,
    items: 3,
    color: '#53B175' // Xanh cho đã giao
  },
  {
    id: '#OD12346',
    date: '08/04/2026',
    status: 'Processing',
    total: 12.00,
    items: 1,
    color: '#F8A44C' // Cam cho đang xử lý
  },
  {
    id: '#OD12347',
    date: '01/04/2026',
    status: 'Cancelled',
    total: 50.25,
    items: 5,
    color: '#F7A593' // Đỏ nhạt cho đã hủy
  },
];