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