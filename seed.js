require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  // === ELECTRONICS (14) ===
  { product_name: 'Wireless Bluetooth Headphones', price: 45000, image: '/images/wireless-bluetooth-headphones.jpg', category: 'Electronics' },
  { product_name: 'Smartwatch Pro Max', price: 120000, image: '/images/smartwatch-pro-max.jpg', category: 'Electronics' },
  { product_name: '4K Ultra HD Monitor 27"', price: 350000, image: '/images/4k-ultra-hd-monitor-27.jpg', category: 'Electronics' },
  { product_name: 'Mechanical Gaming Keyboard RGB', price: 55000, image: '/images/mechanical-gaming-keyboard-rgb.jpg', category: 'Electronics' },
  { product_name: 'Wireless Charging Pad Fast', price: 25000, image: '/images/wireless-charging-pad-fast.jpg', category: 'Electronics' },
  { product_name: 'Noise Cancelling Earbuds Pro', price: 85000, image: '/images/noise-cancelling-earbuds-pro.jpg', category: 'Electronics' },
  { product_name: 'Bluetooth Portable Speaker', price: 35000, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'USB-C Hub 7-in-1 Adapter', price: 30000, image: '/images/usb-c-hub-7-in-1-adapter.jpg', category: 'Electronics' },
  { product_name: 'Wireless Mouse Ergonomic', price: 22000, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'External SSD 1TB Portable', price: 180000, image: '/images/external-ssd-1tb-portable.jpg', category: 'Electronics' },
  { product_name: 'Webcam 4K Ultra HD', price: 65000, image: '/images/webcam-4k-ultra-hd.jpg', category: 'Electronics' },
  { product_name: 'Smart Home Security Camera', price: 48000, image: '/images/smart-home-security-camera.jpg', category: 'Electronics' },
  { product_name: 'Gaming Mouse Pad XL RGB', price: 18000, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'Laptop Stand Adjustable Aluminum', price: 35000, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },

  // === PHONES (9) ===
  { product_name: 'iPhone 16 Pro Max 256GB', price: 2800000, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80', category: 'Phones' },
  { product_name: 'Samsung Galaxy S25 Ultra', price: 2500000, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80', category: 'Phones' },
  { product_name: 'Google Pixel 9 Pro XL', price: 2100000, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', category: 'Phones' },
  { product_name: 'OnePlus 13 5G', price: 1650000, image: 'https://images.unsplash.com/photo-1616348436168-de43ad0a179e?auto=format&fit=crop&w=500&q=80', category: 'Phones' },
  { product_name: 'Xiaomi 14 Pro', price: 1200000, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', category: 'Phones' },
  { product_name: 'Tecno Camon 40 Pro', price: 450000, image: 'https://images.unsplash.com/photo-1616348436168-de43ad0a179e?auto=format&fit=crop&w=500&q=80', category: 'Phones' },
  { product_name: 'Samsung Galaxy A55 5G', price: 750000, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80', category: 'Phones' },
  { product_name: 'iPhone 15 128GB', price: 1850000, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80', category: 'Phones' },
  { product_name: 'Infinix Zero 40 5G', price: 380000, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80', category: 'Phones' },

  // === FASHION (10) ===
  { product_name: 'Premium Leather Backpack', price: 65000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80', category: 'Fashion' },
  { product_name: 'Designer Sunglasses Aviator', price: 35000, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80', category: 'Fashion' },
  { product_name: 'Classic Analog Wristwatch', price: 95000, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=500&q=80', category: 'Fashion' },
  { product_name: "Men's Slim Fit Blazer", price: 120000, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=500&q=80', category: 'Fashion' },
  { product_name: "Women's Designer Handbag", price: 85000, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80', category: 'Fashion' },
  { product_name: 'Cashmere Winter Scarf', price: 28000, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80', category: 'Fashion' },
  { product_name: 'Leather Belt Premium', price: 22000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80', category: 'Fashion' },
  { product_name: 'Gold Plated Chain Necklace', price: 45000, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80', category: 'Fashion' },
  { product_name: 'Canvas Messenger Bag', price: 38000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80', category: 'Fashion' },
  { product_name: 'Premium Wool Fedora Hat', price: 25000, image: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=500&q=80', category: 'Fashion' },

  // === SHOES (9) ===
  { product_name: 'Nike Air Max 270', price: 180000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80', category: 'Shoes' },
  { product_name: 'Adidas Ultraboost 23', price: 165000, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80', category: 'Shoes' },
  { product_name: 'Puma RS-X Sneakers', price: 95000, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500&q=80', category: 'Shoes' },
  { product_name: 'Timberland Premium Boots', price: 220000, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=500&q=80', category: 'Shoes' },
  { product_name: 'Converse Chuck Taylor All Star', price: 65000, image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=500&q=80', category: 'Shoes' },
  { product_name: 'New Balance 574 Classic', price: 120000, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80', category: 'Shoes' },
  { product_name: 'Vans Old Skool Black', price: 75000, image: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&w=500&q=80', category: 'Shoes' },
  { product_name: 'Formal Oxford Leather Shoes', price: 85000, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=500&q=80', category: 'Shoes' },
  { product_name: 'Crocs Classic Clogs', price: 35000, image: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=500&q=80', category: 'Shoes' },

  // === GAMING (10) ===
  { product_name: 'PlayStation 5 Slim Digital', price: 950000, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80', category: 'Gaming' },
  { product_name: 'Xbox Series X 1TB', price: 900000, image: 'https://images.unsplash.com/photo-1621259182978-fbf931d75d5a?auto=format&fit=crop&w=500&q=80', category: 'Gaming' },
  { product_name: 'Nintendo Switch OLED', price: 550000, image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=500&q=80', category: 'Gaming' },
  { product_name: 'DualSense Wireless Controller', price: 85000, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80', category: 'Gaming' },
  { product_name: 'Razer Kraken Gaming Headset', price: 65000, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80', category: 'Gaming' },
  { product_name: 'Logitech G Pro Wireless Mouse', price: 72000, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=80', category: 'Gaming' },
  { product_name: 'Gaming Chair Ergonomic RGB', price: 280000, image: 'https://images.unsplash.com/photo-1598550476439-6845ed764a4e?auto=format&fit=crop&w=500&q=80', category: 'Gaming' },
  { product_name: 'SteelSeries Apex Pro Keyboard', price: 120000, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=500&q=80', category: 'Gaming' },
  { product_name: 'VR Headset Meta Quest 3', price: 750000, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=500&q=80', category: 'Gaming' },
  { product_name: 'ASUS ROG 32" 4K Gaming Monitor', price: 450000, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80', category: 'Gaming' },

  // === HOME & LIFESTYLE (14) ===
  { product_name: 'Smart LED Desk Lamp', price: 32000, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Mini Fridge 12L USB', price: 85000, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Essential Oil Diffuser', price: 22000, image: 'https://images.unsplash.com/photo-1602928298849-325cec8771c0?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Electric Kettle Stainless Steel', price: 28000, image: 'https://images.unsplash.com/photo-1576221292154-30436ed0beef?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Robot Vacuum Cleaner', price: 180000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Portable Blender USB-C', price: 25000, image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Smart LED Light Strip 5M', price: 15000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Digital Photo Frame 10"', price: 65000, image: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Air Purifier HEPA Filter', price: 125000, image: 'https://images.unsplash.com/photo-1585773692125-3d8c7e0b9a1f?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Electric Toothbrush Sonic', price: 35000, image: 'https://images.unsplash.com/photo-1607610318779-2e8c6b4d7a1e?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Towel Warmer Electric', price: 95000, image: 'https://images.unsplash.com/photo-1602879608859-6a7c3b1f2e8d?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Cordless Stick Vacuum', price: 145000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Humidifier Ultrasonic Cool Mist', price: 28000, image: 'https://images.unsplash.com/photo-1602879608859-6a7c3b1f2e8d?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },
  { product_name: 'Smart Thermostat WiFi', price: 85000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=500&q=80', category: 'Home & Lifestyle' },

  // === SPORTS & OUTDOORS (14) ===
  { product_name: 'Yoga Mat Premium Non-Slip 6mm', price: 22000, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Adjustable Dumbbell Set 20kg', price: 95000, image: 'https://images.unsplash.com/photo-1638536532686-d612ad34a9d8?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Resistance Bands Set 5-Pack', price: 15000, image: 'https://images.unsplash.com/photo-1638536532686-d612ad34a9d8?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Foldable Camping Chair', price: 35000, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Insulated Water Bottle 1L', price: 18000, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Hiking Backpack 40L', price: 65000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Portable Camping Hammock', price: 28000, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'LED Headlamp Rechargeable', price: 15000, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Jump Rope Speed Cable', price: 8000, image: 'https://images.unsplash.com/photo-1638536532686-d612ad34a9d8?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Kettlebell Cast Iron 16kg', price: 42000, image: 'https://images.unsplash.com/photo-1638536532686-d612ad34a9d8?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Telescope Astronomical 70mm', price: 185000, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Bike Helmet Lightweight Ventilated', price: 32000, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Foam Roller Muscle Recovery', price: 15000, image: 'https://images.unsplash.com/photo-1638536532686-d612ad34a9d8?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },
  { product_name: 'Ab Roller Wheel with Knee Pad', price: 12000, image: 'https://images.unsplash.com/photo-1638536532686-d612ad34a9d8?auto=format&fit=crop&w=500&q=80', category: 'Sports & Outdoors' },

  // === ELECTRONICS EXTRA (12) ===
  { product_name: 'Portable Power Bank 20000mAh', price: 35000, image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'Wireless Earbuds TWS IPX5', price: 28000, image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'Dash Camera 1080p Night Vision', price: 45000, image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'Car Phone Holder Magnetic', price: 12000, image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'Smart Plug WiFi 4-Pack', price: 32000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'GPS Tracker for Car', price: 28000, image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'WiFi Range Extender AC1200', price: 22000, image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'Portable Projector Mini HD', price: 165000, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'Digital Voice Recorder', price: 35000, image: 'https://images.unsplash.com/photo-1587829741301-33d8c6d9c8e7?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'Universal Travel Adapter International', price: 18000, image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'Streaming Webcam Ring Light', price: 25000, image: 'https://images.unsplash.com/photo-1587829741301-33d8c6d9c8e7?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
  { product_name: 'Cable Management Box', price: 12000, image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },

  // === HEALTH & BEAUTY (8) ===
  { product_name: 'Hair Dryer Professional 2000W', price: 35000, image: 'https://images.unsplash.com/photo-1522337360788-6c1c8b7a9e2d?auto=format&fit=crop&w=500&q=80', category: 'Health & Beauty' },
  { product_name: 'Electric Shaver Foil Rechargeable', price: 42000, image: 'https://images.unsplash.com/photo-1574781331507-5c9e8b1a6f4c?auto=format&fit=crop&w=500&q=80', category: 'Health & Beauty' },
  { product_name: 'Facial Cleansing Brush Sonic', price: 22000, image: 'https://images.unsplash.com/photo-1570179561313-4c7d8e9f0a2b?auto=format&fit=crop&w=500&q=80', category: 'Health & Beauty' },
  { product_name: 'Beard Trimmer Cordless Precision', price: 18000, image: 'https://images.unsplash.com/photo-1574781331507-5c9e8b1a6f4c?auto=format&fit=crop&w=500&q=80', category: 'Health & Beauty' },
  { product_name: 'Digital Bathroom Scale', price: 15000, image: 'https://images.unsplash.com/photo-1571736102852-0a8e9c0d7f4b?auto=format&fit=crop&w=500&q=80', category: 'Health & Beauty' },
  { product_name: 'Massage Gun Deep Tissue', price: 55000, image: 'https://images.unsplash.com/photo-1638536532686-d612ad34a9d8?auto=format&fit=crop&w=500&q=80', category: 'Health & Beauty' },
  { product_name: 'Essential Oil Set 6 Pack', price: 18000, image: 'https://images.unsplash.com/photo-1602928298849-325cec8771c0?auto=format&fit=crop&w=500&q=80', category: 'Health & Beauty' },
  { product_name: 'Nail Kit Professional Manicure', price: 12000, image: 'https://images.unsplash.com/photo-1570179561313-4c7d8e9f0a2b?auto=format&fit=crop&w=500&q=80', category: 'Health & Beauty' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log(`Seeded ${sampleProducts.length} products`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
