const { query } = require('./index');

async function seed() {
  console.log('Seeding database...');

  // --- Default user ---
  await query(`
    INSERT INTO users (name, email, phone) VALUES
    ('Rahul Sharma', 'rahul@example.com', '9876543210')
    ON CONFLICT (email) DO NOTHING;
  `);

  // --- Categories ---
  await query(`
    INSERT INTO categories (name, slug, image_url) VALUES
    ('Mobiles', 'mobiles', 'https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png'),
    ('Electronics', 'electronics', 'https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png'),
    ('Fashion', 'fashion', 'https://rukminim2.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png'),
    ('Home & Kitchen', 'home-kitchen', 'https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg'),
    ('Books', 'books', 'https://rukminim2.flixcart.com/flap/128/128/image/71050627a56b4693.png'),
    ('Appliances', 'appliances', 'https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png')
    ON CONFLICT (slug) DO NOTHING;
  `);

  // --- Products ---
  const productsData = [
    // ── Mobiles (12) ─────────────────────────────────────────────────────────
    {
      category_slug: 'mobiles', name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra',
      description: 'The Samsung Galaxy S24 Ultra features a 6.8-inch QHD+ Dynamic AMOLED display, Snapdragon 8 Gen 3, 12GB RAM, and a 200MP quad camera system.',
      brand: 'Samsung', price: 124999, mrp: 134999, discount: 7, stock: 50, rating: 4.5, rating_count: 12450, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/2.webp',
      ],
      specs: [['Display', '6.8-inch QHD+ 120Hz'], ['Processor', 'Snapdragon 8 Gen 3'], ['RAM', '12 GB'], ['Storage', '256 GB'], ['Camera', '200MP + 12MP + 10MP + 10MP'], ['Battery', '5000 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'Apple iPhone 15 Pro', slug: 'apple-iphone-15-pro',
      description: 'iPhone 15 Pro features a titanium design, A17 Pro chip, 48MP main camera with 5x optical zoom, and USB 3 speeds.',
      brand: 'Apple', price: 119900, mrp: 134900, discount: 11, stock: 30, rating: 4.7, rating_count: 8920, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp',
      ],
      specs: [['Display', '6.1-inch Super Retina XDR OLED'], ['Processor', 'A17 Pro'], ['RAM', '8 GB'], ['Storage', '128 GB'], ['Camera', '48MP + 12MP + 12MP'], ['Battery', '3274 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'OnePlus 12', slug: 'oneplus-12',
      description: 'OnePlus 12 features Snapdragon 8 Gen 3, 50MP Hasselblad camera, 100W SUPERVOOC charging, and a 6.82-inch ProXDR display.',
      brand: 'OnePlus', price: 64999, mrp: 69999, discount: 7, stock: 80, rating: 4.4, rating_count: 5630, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/2.webp',
      ],
      specs: [['Display', '6.82-inch 2K ProXDR 120Hz'], ['Processor', 'Snapdragon 8 Gen 3'], ['RAM', '12 GB'], ['Storage', '256 GB'], ['Camera', '50MP + 48MP + 64MP'], ['Battery', '5400 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'Redmi Note 13 Pro+', slug: 'redmi-note-13-pro-plus',
      description: 'Redmi Note 13 Pro+ sports a 200MP OIS camera, Dimensity 7200 Ultra processor, and 120W HyperCharge.',
      brand: 'Xiaomi', price: 29999, mrp: 34999, discount: 14, stock: 120, rating: 4.3, rating_count: 18750, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/realme-c35/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/realme-c35/2.webp',
      ],
      specs: [['Display', '6.67-inch AMOLED 120Hz'], ['Processor', 'Dimensity 7200 Ultra'], ['RAM', '8 GB'], ['Storage', '256 GB'], ['Camera', '200MP + 8MP + 2MP'], ['Battery', '5000 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'Google Pixel 8 Pro', slug: 'google-pixel-8-pro',
      description: 'Google Pixel 8 Pro with Google Tensor G3 chip, 6.7-inch LTPO OLED display, 50MP triple rear camera, and 7 years of OS updates.',
      brand: 'Google', price: 106999, mrp: 119999, discount: 11, stock: 40, rating: 4.6, rating_count: 4320, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
      ],
      specs: [['Display', '6.7-inch LTPO OLED 120Hz'], ['Processor', 'Google Tensor G3'], ['RAM', '12 GB'], ['Storage', '128 GB'], ['Camera', '50MP + 48MP + 48MP'], ['Battery', '5050 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'Vivo V30 Pro 5G', slug: 'vivo-v30-pro-5g',
      description: 'Vivo V30 Pro 5G with Snapdragon 8s Gen 3, 50MP ZEISS camera, curved AMOLED display, and 80W FlashCharge.',
      brand: 'Vivo', price: 44999, mrp: 49999, discount: 10, stock: 65, rating: 4.3, rating_count: 7810, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/realme-c35/1.webp',
      ],
      specs: [['Display', '6.78-inch Curved AMOLED 120Hz'], ['Processor', 'Snapdragon 8s Gen 3'], ['RAM', '12 GB'], ['Storage', '256 GB'], ['Camera', '50MP + 50MP + 8MP'], ['Battery', '5000 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'Realme GT 5 Pro', slug: 'realme-gt-5-pro',
      description: 'Realme GT 5 Pro with Snapdragon 8 Gen 3, 144Hz AMOLED display, 50MP periscope camera, and 100W SUPERVOOC charging.',
      brand: 'Realme', price: 39999, mrp: 44999, discount: 11, stock: 90, rating: 4.4, rating_count: 6120, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/realme-c35/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/realme-c35/2.webp',
      ],
      specs: [['Display', '6.78-inch AMOLED 144Hz'], ['Processor', 'Snapdragon 8 Gen 3'], ['RAM', '12 GB'], ['Storage', '256 GB'], ['Camera', '50MP + 50MP + 8MP'], ['Battery', '5400 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'Nothing Phone 2a', slug: 'nothing-phone-2a',
      description: 'Nothing Phone 2a with MediaTek Dimensity 7200 Pro, transparent design with Glyph Interface, and 50MP dual camera.',
      brand: 'Nothing', price: 23999, mrp: 27999, discount: 14, stock: 100, rating: 4.2, rating_count: 9540, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/1.webp',
      ],
      specs: [['Display', '6.7-inch AMOLED 120Hz'], ['Processor', 'Dimensity 7200 Pro'], ['RAM', '8 GB'], ['Storage', '128 GB'], ['Camera', '50MP + 50MP'], ['Battery', '5000 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'Samsung Galaxy A55 5G', slug: 'samsung-galaxy-a55-5g',
      description: 'Samsung Galaxy A55 5G with Exynos 1480, 50MP OIS camera, IP67 rating, and 5-year OS update promise.',
      brand: 'Samsung', price: 34999, mrp: 38999, discount: 10, stock: 110, rating: 4.3, rating_count: 14230, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/2.webp',
      ],
      specs: [['Display', '6.6-inch Super AMOLED 120Hz'], ['Processor', 'Exynos 1480'], ['RAM', '8 GB'], ['Storage', '128 GB'], ['Camera', '50MP + 12MP + 5MP'], ['Battery', '5000 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'Motorola Edge 50 Fusion', slug: 'motorola-edge-50-fusion',
      description: 'Motorola Edge 50 Fusion with Snapdragon 7s Gen 2, 144Hz pOLED display, 50MP OIS camera, and 68W TurboPower charging.',
      brand: 'Motorola', price: 22999, mrp: 25999, discount: 12, stock: 85, rating: 4.1, rating_count: 11780, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/2.webp',
      ],
      specs: [['Display', '6.7-inch pOLED 144Hz'], ['Processor', 'Snapdragon 7s Gen 2'], ['RAM', '8 GB'], ['Storage', '128 GB'], ['Camera', '50MP + 13MP'], ['Battery', '5000 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'Poco X6 Pro 5G', slug: 'poco-x6-pro-5g',
      description: 'Poco X6 Pro 5G with Dimensity 8300 Ultra, 64MP triple camera, 67W turbo charging, and 120Hz AMOLED display.',
      brand: 'Poco', price: 26999, mrp: 29999, discount: 10, stock: 130, rating: 4.3, rating_count: 16540, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/realme-c35/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/realme-c35/2.webp',
      ],
      specs: [['Display', '6.67-inch AMOLED 120Hz'], ['Processor', 'Dimensity 8300 Ultra'], ['RAM', '12 GB'], ['Storage', '256 GB'], ['Camera', '64MP + 8MP + 2MP'], ['Battery', '5000 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'iQOO Neo 9 Pro', slug: 'iqoo-neo-9-pro',
      description: 'iQOO Neo 9 Pro powered by Snapdragon 8 Gen 3, 50MP IMX920 OIS camera, 144Hz AMOLED, and 120W FlashCharge.',
      brand: 'iQOO', price: 36999, mrp: 42999, discount: 14, stock: 70, rating: 4.4, rating_count: 8970, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
        'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp',
      ],
      specs: [['Display', '6.78-inch AMOLED 144Hz'], ['Processor', 'Snapdragon 8 Gen 3'], ['RAM', '12 GB'], ['Storage', '256 GB'], ['Camera', '50MP + 8MP + 2MP'], ['Battery', '5160 mAh']]
    },

    // ── Electronics (12) ─────────────────────────────────────────────────────
    {
      category_slug: 'electronics', name: 'Sony WH-1000XM5 Headphones', slug: 'sony-wh-1000xm5',
      description: 'Industry-leading noise canceling headphones with 30-hour battery life, multipoint connection, and crystal clear hands-free calling.',
      brand: 'Sony', price: 24990, mrp: 29990, discount: 17, stock: 45, rating: 4.6, rating_count: 7840, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp',
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/2.webp',
      ],
      specs: [['Type', 'Over-ear'], ['Connectivity', 'Bluetooth 5.2, 3.5mm'], ['Battery', '30 hours'], ['ANC', 'Yes'], ['Weight', '250g']]
    },
    {
      category_slug: 'electronics', name: 'Apple MacBook Air M3', slug: 'apple-macbook-air-m3',
      description: 'MacBook Air with M3 chip, 13.6-inch Liquid Retina display, 18-hour battery life, and fanless design.',
      brand: 'Apple', price: 114900, mrp: 119900, discount: 4, stock: 25, rating: 4.8, rating_count: 4210, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
        'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp',
      ],
      specs: [['Processor', 'Apple M3'], ['RAM', '8 GB'], ['Storage', '256 GB SSD'], ['Display', '13.6-inch Liquid Retina'], ['Battery', '18 hours'], ['Weight', '1.24 kg']]
    },
    {
      category_slug: 'electronics', name: 'Samsung 65" 4K QLED TV', slug: 'samsung-65-qled-tv',
      description: 'Samsung 65-inch QLED 4K Smart TV with Quantum Processor, 100% Color Volume, and Alexa built-in.',
      brand: 'Samsung', price: 89999, mrp: 149900, discount: 40, stock: 15, rating: 4.4, rating_count: 3250, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp',
        'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/2.webp',
      ],
      specs: [['Screen Size', '65 inch'], ['Resolution', '4K UHD'], ['Refresh Rate', '120Hz'], ['Smart TV', 'Yes (Tizen OS)'], ['HDR', 'Quantum HDR+']]
    },
    {
      category_slug: 'electronics', name: 'Logitech MX Master 3S Mouse', slug: 'logitech-mx-master-3s',
      description: 'Advanced wireless mouse with 8K DPI sensor, MagSpeed scroll wheel, and ergonomic design for all-day comfort.',
      brand: 'Logitech', price: 9495, mrp: 10995, discount: 14, stock: 200, rating: 4.5, rating_count: 2860, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp',
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/2.webp',
      ],
      specs: [['Connectivity', 'Bluetooth, USB-C'], ['DPI', '200 - 8000'], ['Battery', '70 days'], ['Buttons', '7'], ['Scroll', 'MagSpeed Electromagnetic']]
    },
    {
      category_slug: 'electronics', name: 'Dell Inspiron 15 Laptop', slug: 'dell-inspiron-15-laptop',
      description: 'Dell Inspiron 15 with Intel Core i5-13th Gen, 8GB RAM, 512GB SSD, and 15.6-inch FHD display. Perfect for everyday computing.',
      brand: 'Dell', price: 54990, mrp: 66990, discount: 18, stock: 35, rating: 4.2, rating_count: 6780, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
        'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp',
      ],
      specs: [['Processor', 'Intel Core i5-1335U'], ['RAM', '8 GB DDR4'], ['Storage', '512 GB SSD'], ['Display', '15.6-inch FHD 120Hz'], ['OS', 'Windows 11 Home'], ['Weight', '1.65 kg']]
    },
    {
      category_slug: 'electronics', name: 'Sony WF-1000XM5 TWS Earbuds', slug: 'sony-wf-1000xm5-earbuds',
      description: 'Sony WF-1000XM5 true wireless earbuds with industry-leading ANC, Hi-Res Audio, and 24-hour total battery life.',
      brand: 'Sony', price: 22990, mrp: 26990, discount: 15, stock: 60, rating: 4.7, rating_count: 5420, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp',
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/2.webp',
      ],
      specs: [['Type', 'In-ear TWS'], ['Battery', '8h + 16h case'], ['ANC', 'Yes'], ['Drivers', 'Dynamic 8.4mm'], ['Water Resistance', 'IPX4']]
    },
    {
      category_slug: 'electronics', name: 'Samsung Galaxy Tab S9 FE', slug: 'samsung-galaxy-tab-s9-fe',
      description: 'Samsung Galaxy Tab S9 FE with 10.9-inch TFT display, Exynos 1380, IP68 rating, and S Pen included.',
      brand: 'Samsung', price: 34999, mrp: 41999, discount: 17, stock: 50, rating: 4.3, rating_count: 4890, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp',
        'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/2.webp',
      ],
      specs: [['Display', '10.9-inch TFT 90Hz'], ['Processor', 'Exynos 1380'], ['RAM', '6 GB'], ['Storage', '128 GB'], ['Battery', '10090 mAh'], ['IP Rating', 'IP68']]
    },
    {
      category_slug: 'electronics', name: 'boAt Rockerz 450 Wireless Headphone', slug: 'boat-rockerz-450',
      description: 'boAt Rockerz 450 over-ear wireless headphone with 40mm drivers, 15-hour playback, and foldable design.',
      brand: 'boAt', price: 1298, mrp: 3990, discount: 67, stock: 400, rating: 4.1, rating_count: 89540, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp',
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp',
      ],
      specs: [['Type', 'Over-ear'], ['Connectivity', 'Bluetooth 5.0'], ['Battery', '15 hours'], ['Drivers', '40mm'], ['Foldable', 'Yes']]
    },
    {
      category_slug: 'electronics', name: 'ASUS ROG Zephyrus G14 2024', slug: 'asus-rog-zephyrus-g14-2024',
      description: 'ASUS ROG Zephyrus G14 with AMD Ryzen 9 8945HS, NVIDIA RTX 4070, 14-inch OLED 165Hz display, and 73Whr battery.',
      brand: 'ASUS', price: 149990, mrp: 179990, discount: 17, stock: 12, rating: 4.7, rating_count: 2340, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
        'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp',
      ],
      specs: [['Processor', 'AMD Ryzen 9 8945HS'], ['GPU', 'NVIDIA RTX 4070'], ['RAM', '16 GB LPDDR5X'], ['Storage', '1 TB SSD'], ['Display', '14-inch OLED 165Hz'], ['Battery', '73 Whr']]
    },
    {
      category_slug: 'electronics', name: 'JBL Charge 5 Bluetooth Speaker', slug: 'jbl-charge-5-speaker',
      description: 'JBL Charge 5 with powerful JBL Pro Sound, IP67 waterproof rating, built-in powerbank, and 20 hours playtime.',
      brand: 'JBL', price: 12999, mrp: 17999, discount: 28, stock: 80, rating: 4.5, rating_count: 11240, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp',
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/2.webp',
      ],
      specs: [['Battery', '20 hours'], ['IP Rating', 'IP67'], ['Output', '30W'], ['Connectivity', 'Bluetooth 5.1'], ['Powerbank', 'Yes']]
    },
    {
      category_slug: 'electronics', name: 'Apple iPad 10th Generation', slug: 'apple-ipad-10th-gen',
      description: 'iPad 10th Gen with A14 Bionic chip, 10.9-inch Liquid Retina display, 12MP front camera, and 5G support.',
      brand: 'Apple', price: 44900, mrp: 48900, discount: 8, stock: 40, rating: 4.6, rating_count: 7610, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp',
        'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/2.webp',
      ],
      specs: [['Processor', 'Apple A14 Bionic'], ['Display', '10.9-inch Liquid Retina'], ['Storage', '64 GB'], ['Front Camera', '12MP Ultra Wide'], ['Connectivity', 'Wi-Fi 6, 5G'], ['Battery', '28.65 Whr']]
    },
    {
      category_slug: 'electronics', name: 'Canon EOS R50 Mirrorless Camera', slug: 'canon-eos-r50',
      description: 'Canon EOS R50 with 24.2MP APS-C sensor, 4K video, Dual Pixel CMOS AF, and lightweight body — ideal for creators.',
      brand: 'Canon', price: 74995, mrp: 82995, discount: 10, stock: 18, rating: 4.7, rating_count: 1980, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp',
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/2.webp',
      ],
      specs: [['Sensor', '24.2MP APS-C CMOS'], ['AF Points', '651 Dual Pixel CMOS AF II'], ['Video', '4K 30fps / 1080p 120fps'], ['ISO', '100 - 32000'], ['Weight', '375g']]
    },

    // ── Fashion (12) ─────────────────────────────────────────────────────────
    {
      category_slug: 'fashion', name: "Levi's 511 Slim Fit Jeans", slug: 'levis-511-slim-fit-jeans',
      description: "Levi's 511 slim fit jeans sit below the waist and are slim through the thigh and leg. A timeless classic with a modern fit.",
      brand: "Levi's", price: 2099, mrp: 3999, discount: 48, stock: 150, rating: 4.2, rating_count: 9876, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp',
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/2.webp',
      ],
      specs: [['Fit', 'Slim'], ['Fabric', '99% Cotton, 1% Elastane'], ['Rise', 'Mid Rise'], ['Closure', 'Zipper'], ['Wash Care', 'Machine Wash']]
    },
    {
      category_slug: 'fashion', name: 'Nike Air Max 270 Sneakers', slug: 'nike-air-max-270',
      description: "Nike Air Max 270 features Nike's biggest heel Air unit yet for a super-cushioned feel with a sleek modern look.",
      brand: 'Nike', price: 9995, mrp: 12995, discount: 23, stock: 80, rating: 4.5, rating_count: 6540, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp',
        'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/2.webp',
      ],
      specs: [['Material', 'Mesh + Synthetic'], ['Sole', 'Air Max Heel Unit'], ['Closure', 'Lace-up'], ['Occasion', 'Casual, Sports'], ['Weight', '310g']]
    },
    {
      category_slug: 'fashion', name: 'Arrow Formal Shirt', slug: 'arrow-formal-shirt',
      description: 'Arrow slim fit formal shirt crafted from premium wrinkle-resistant fabric. Perfect for office wear.',
      brand: 'Arrow', price: 1499, mrp: 2999, discount: 50, stock: 200, rating: 4.1, rating_count: 3420, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp',
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp',
      ],
      specs: [['Fit', 'Slim'], ['Fabric', '100% Cotton'], ['Pattern', 'Solid'], ['Sleeve', 'Full Sleeve'], ['Collar', 'Spread Collar']]
    },
    {
      category_slug: 'fashion', name: 'Puma Men Polo T-Shirt', slug: 'puma-men-polo-tshirt',
      description: 'Puma polo T-shirt made from moisture-wicking dryCELL fabric. Ideal for casual outings and sports.',
      brand: 'Puma', price: 999, mrp: 1999, discount: 50, stock: 300, rating: 4.1, rating_count: 21340, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp',
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp',
      ],
      specs: [['Fit', 'Regular'], ['Fabric', '100% Polyester dryCELL'], ['Pattern', 'Solid'], ['Sleeve', 'Short Sleeve'], ['Collar', 'Polo']]
    },
    {
      category_slug: 'fashion', name: 'Adidas Ultraboost 22 Running Shoes', slug: 'adidas-ultraboost-22',
      description: 'Adidas Ultraboost 22 with BOOST midsole technology, Primeknit+ upper, and Continental rubber outsole for ultimate comfort.',
      brand: 'Adidas', price: 15000, mrp: 18000, discount: 17, stock: 60, rating: 4.6, rating_count: 8760, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp',
        'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/2.webp',
      ],
      specs: [['Material', 'Primeknit+'], ['Sole', 'BOOST + Continental Rubber'], ['Closure', 'Lace-up'], ['Drop', '10mm'], ['Weight', '312g']]
    },
    {
      category_slug: 'fashion', name: 'Allen Solly Women Kurta', slug: 'allen-solly-women-kurta',
      description: "Allen Solly women's straight fit kurta in cotton blend with elegant print. Versatile for office and casual wear.",
      brand: 'Allen Solly', price: 1299, mrp: 2599, discount: 50, stock: 180, rating: 4.0, rating_count: 5430, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp',
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/2.webp',
      ],
      specs: [['Fit', 'Straight'], ['Fabric', 'Cotton Blend'], ['Pattern', 'Printed'], ['Sleeve', 'Three-Quarter Sleeve'], ['Wash Care', 'Machine Wash']]
    },
    {
      category_slug: 'fashion', name: 'Raymond Slim Fit Blazer', slug: 'raymond-slim-fit-blazer',
      description: 'Raymond slim fit single-breasted blazer in premium wool blend. Elevate your formal wardrobe with this timeless piece.',
      brand: 'Raymond', price: 4999, mrp: 9999, discount: 50, stock: 60, rating: 4.3, rating_count: 2890, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp',
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp',
      ],
      specs: [['Fit', 'Slim'], ['Fabric', 'Wool Blend'], ['Buttons', 'Single Breasted 2 Button'], ['Lining', 'Full Lining'], ['Occasion', 'Formal, Party']]
    },
    {
      category_slug: 'fashion', name: 'Fossil Gen 6 Smartwatch', slug: 'fossil-gen-6-smartwatch',
      description: 'Fossil Gen 6 smartwatch with Snapdragon 4100+ chip, SpO2 and heart rate monitor, 1.28-inch AMOLED display, and Wear OS.',
      brand: 'Fossil', price: 14995, mrp: 22995, discount: 35, stock: 45, rating: 4.2, rating_count: 3760, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp',
        'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp',
      ],
      specs: [['Display', '1.28-inch AMOLED'], ['OS', 'Wear OS by Google'], ['Processor', 'Snapdragon Wear 4100+'], ['Sensors', 'SpO2, HR, GPS'], ['Battery', '24 hours'], ['Water Resistance', '3 ATM']]
    },
    {
      category_slug: 'fashion', name: 'Ray-Ban Wayfarer Classic Sunglasses', slug: 'rayban-wayfarer-classic',
      description: 'Ray-Ban Wayfarer Classic with acetate frame, crystal lenses, and 100% UV protection. An iconic style since 1956.',
      brand: 'Ray-Ban', price: 7990, mrp: 9990, discount: 20, stock: 90, rating: 4.5, rating_count: 7120, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp',
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp',
      ],
      specs: [['Frame', 'Acetate'], ['Lens', 'Crystal G-15'], ['UV Protection', '100%'], ['Lens Width', '50mm'], ['Style', 'Wayfarer']]
    },
    {
      category_slug: 'fashion', name: 'Peter England Men Chino Trousers', slug: 'peter-england-chino-trousers',
      description: 'Peter England slim fit chino trousers in 100% cotton. Comfortable and versatile for smart casual occasions.',
      brand: 'Peter England', price: 1499, mrp: 2799, discount: 46, stock: 170, rating: 4.1, rating_count: 6780, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp',
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp',
      ],
      specs: [['Fit', 'Slim'], ['Fabric', '100% Cotton'], ['Rise', 'Mid Rise'], ['Closure', 'Zipper with Hook & Bar'], ['Occasion', 'Casual, Semi-Formal']]
    },
    {
      category_slug: 'fashion', name: 'W Women Printed Anarkali Kurta', slug: 'w-women-anarkali-kurta',
      description: "W by Westside women's printed anarkali kurta with 3/4 sleeves and flowy fit. Crafted from cotton blend fabric.",
      brand: 'W', price: 1799, mrp: 3499, discount: 49, stock: 140, rating: 4.2, rating_count: 4530, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp',
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/2.webp',
      ],
      specs: [['Fit', 'Anarkali / Flared'], ['Fabric', 'Cotton Blend'], ['Sleeve', '3/4 Sleeve'], ['Pattern', 'Floral Print'], ['Wash Care', 'Machine Wash']]
    },
    {
      category_slug: 'fashion', name: 'Mango Women Floral Midi Dress', slug: 'mango-floral-midi-dress',
      description: 'Mango floral print midi dress with V-neckline, puff sleeves, and elasticated waist. Effortlessly chic.',
      brand: 'Mango', price: 2999, mrp: 5999, discount: 50, stock: 75, rating: 4.3, rating_count: 3210, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp',
        'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp',
      ],
      specs: [['Fit', 'Regular'], ['Fabric', 'Viscose'], ['Neckline', 'V-neck'], ['Sleeve', 'Puff Short Sleeve'], ['Length', 'Midi']]
    },

    // ── Home & Kitchen (12) ───────────────────────────────────────────────────
    {
      category_slug: 'home-kitchen', name: 'Prestige Induction Cooktop', slug: 'prestige-induction-cooktop',
      description: 'Prestige 2000W induction cooktop with 8 power levels, auto voltage regulator, and push-button controls.',
      brand: 'Prestige', price: 1999, mrp: 3500, discount: 43, stock: 75, rating: 4.3, rating_count: 15670, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/2.webp',
      ],
      specs: [['Power', '2000W'], ['Voltage', '230V'], ['Controls', 'Push Button'], ['Power Levels', '8'], ['Pan Size', 'Min 12cm, Max 26cm']]
    },
    {
      category_slug: 'home-kitchen', name: 'Milton Thermosteel Flask', slug: 'milton-thermosteel-flask',
      description: 'Milton Thermosteel 24-hour hot and cold flask with double wall insulation and leak-proof lid.',
      brand: 'Milton', price: 599, mrp: 1299, discount: 54, stock: 300, rating: 4.2, rating_count: 28450, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/2.webp',
      ],
      specs: [['Capacity', '1000 ml'], ['Material', 'Stainless Steel'], ['Insulation', 'Double Wall'], ['Duration', '24 Hours Hot/Cold'], ['Lid', 'Stainless Steel']]
    },
    {
      category_slug: 'home-kitchen', name: 'Philips HD9252 Air Fryer', slug: 'philips-hd9252-air-fryer',
      description: 'Philips 4.1L Air Fryer with Rapid Air Technology, 7 presets, digital display, and dishwasher-safe parts.',
      brand: 'Philips', price: 7995, mrp: 12995, discount: 38, stock: 55, rating: 4.4, rating_count: 19870, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/2.webp',
      ],
      specs: [['Capacity', '4.1 L'], ['Power', '1400W'], ['Technology', 'Rapid Air'], ['Presets', '7'], ['Dishwasher Safe', 'Yes']]
    },
    {
      category_slug: 'home-kitchen', name: 'Instant Pot Duo 7-in-1', slug: 'instant-pot-duo-7-in-1',
      description: 'Instant Pot Duo 7-in-1 electric pressure cooker: pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer.',
      brand: 'Instant Pot', price: 6995, mrp: 9995, discount: 30, stock: 40, rating: 4.6, rating_count: 12340, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp',
      ],
      specs: [['Capacity', '5.7 L'], ['Functions', '7-in-1'], ['Programs', '14 One-Touch'], ['Pressure Levels', 'High & Low'], ['Material', 'Stainless Steel Pot']]
    },
    {
      category_slug: 'home-kitchen', name: 'Borosil Glass Casserole Set', slug: 'borosil-glass-casserole-set',
      description: 'Borosil Vision glass casserole set of 3 with airtight lids. Microwave, oven, and dishwasher safe borosilicate glass.',
      brand: 'Borosil', price: 1299, mrp: 2499, discount: 48, stock: 200, rating: 4.3, rating_count: 22780, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
      ],
      specs: [['Material', 'Borosilicate Glass'], ['Set', '3 Pieces (0.5L + 1L + 1.5L)'], ['Microwave Safe', 'Yes'], ['Dishwasher Safe', 'Yes'], ['Oven Safe', 'Yes']]
    },
    {
      category_slug: 'home-kitchen', name: 'Hawkins Contura Pressure Cooker 5L', slug: 'hawkins-contura-pressure-cooker-5l',
      description: 'Hawkins Contura 5L hard-anodised pressure cooker with deep lid, cool-touch handles, and new gasket release system.',
      brand: 'Hawkins', price: 2695, mrp: 3500, discount: 23, stock: 120, rating: 4.5, rating_count: 35600, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp',
      ],
      specs: [['Capacity', '5 L'], ['Material', 'Hard Anodised Aluminium'], ['Compatible', 'Gas, Electric, Kerosene'], ['Safety', 'Gasket Release System'], ['ISI Marked', 'Yes']]
    },
    {
      category_slug: 'home-kitchen', name: 'Cello Opalware Dinner Set 26Pc', slug: 'cello-opalware-dinner-set-26pc',
      description: 'Cello Opalware 26-piece dinner set. Scratch and stain resistant, microwave and dishwasher safe opalware.',
      brand: 'Cello', price: 1299, mrp: 2999, discount: 57, stock: 150, rating: 4.2, rating_count: 17890, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/2.webp',
      ],
      specs: [['Material', 'Opalware'], ['Pieces', '26'], ['Microwave Safe', 'Yes'], ['Dishwasher Safe', 'Yes'], ['Pattern', 'Floral Print']]
    },
    {
      category_slug: 'home-kitchen', name: 'Kent Cold Press Juicer', slug: 'kent-cold-press-juicer',
      description: 'Kent Cold Press Juicer with 240W motor, 80 RPM slow squeeze technology, and 1.5L jug capacity. Preserves nutrients.',
      brand: 'Kent', price: 5999, mrp: 8999, discount: 33, stock: 35, rating: 4.3, rating_count: 8760, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/2.webp',
      ],
      specs: [['Motor', '240W'], ['RPM', '80 (Slow Squeeze)'], ['Jug Capacity', '1.5 L'], ['Pulp Container', '0.8 L'], ['Material', 'Food-Grade Plastic + SS']]
    },
    {
      category_slug: 'home-kitchen', name: 'Solimo Digital Kitchen Scale', slug: 'solimo-digital-kitchen-scale',
      description: 'Amazon Solimo digital kitchen scale with 5kg capacity, 1g precision, stainless steel platform, and tare function.',
      brand: 'Solimo', price: 499, mrp: 999, discount: 50, stock: 500, rating: 4.1, rating_count: 41230, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
      ],
      specs: [['Capacity', '5 kg'], ['Precision', '1 g'], ['Platform', 'Stainless Steel'], ['Display', 'LCD'], ['Tare Function', 'Yes']]
    },
    {
      category_slug: 'home-kitchen', name: 'Pigeon Stovekraft Non-Stick Cookware Set', slug: 'pigeon-nonstick-cookware-set',
      description: 'Pigeon by Stovekraft 5-piece non-stick cookware set including kadhai, tawa, and saucepan with glass lids.',
      brand: 'Pigeon', price: 1499, mrp: 3499, discount: 57, stock: 160, rating: 4.2, rating_count: 26780, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
      ],
      specs: [['Pieces', '5'], ['Coating', 'Non-Stick PTFE'], ['Compatible', 'Gas, Induction'], ['Lids', 'Toughened Glass'], ['Handle', 'Bakelite']]
    },
    {
      category_slug: 'home-kitchen', name: 'Wipro 9W Smart LED Bulb', slug: 'wipro-9w-smart-led-bulb',
      description: 'Wipro 9W Wi-Fi enabled smart LED bulb with 16 million colours, voice control (Alexa/Google), and 25000-hour lifespan.',
      brand: 'Wipro', price: 699, mrp: 1299, discount: 46, stock: 600, rating: 4.0, rating_count: 33450, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp',
      ],
      specs: [['Power', '9W'], ['Brightness', '800 Lumens'], ['Colours', '16 Million'], ['Control', 'Wi-Fi, Voice'], ['Lifespan', '25000 hours']]
    },
    {
      category_slug: 'home-kitchen', name: 'Nilkamal Chester Plastic Cabinet', slug: 'nilkamal-chester-plastic-cabinet',
      description: 'Nilkamal Chester 4-shelf plastic cabinet with lockable doors. Durable, lightweight, and easy to assemble.',
      brand: 'Nilkamal', price: 3499, mrp: 5999, discount: 42, stock: 30, rating: 4.1, rating_count: 9870, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
      ],
      specs: [['Material', 'High Grade Plastic'], ['Shelves', '4'], ['Lockable', 'Yes'], ['Assembly', 'Tool-Free'], ['Weight Capacity', '30 kg per shelf']]
    },

    // ── Books (12) ────────────────────────────────────────────────────────────
    {
      category_slug: 'books', name: 'Atomic Habits by James Clear', slug: 'atomic-habits-james-clear',
      description: 'A revolutionary system to get 1% better every day. The most comprehensive guide on how to change your habits and get 1% better every day.',
      brand: 'Penguin', price: 499, mrp: 799, discount: 38, stock: 500, rating: 4.8, rating_count: 45230, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/2.webp',
      ],
      specs: [['Author', 'James Clear'], ['Publisher', 'Penguin Random House'], ['Pages', '320'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    {
      category_slug: 'books', name: 'The Psychology of Money', slug: 'psychology-of-money',
      description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel. A must-read for anyone interested in personal finance.',
      brand: 'Jaico Publishing', price: 349, mrp: 599, discount: 42, stock: 400, rating: 4.7, rating_count: 32100, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/2.webp',
      ],
      specs: [['Author', 'Morgan Housel'], ['Publisher', 'Harriman House'], ['Pages', '256'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    {
      category_slug: 'books', name: 'Rich Dad Poor Dad', slug: 'rich-dad-poor-dad',
      description: "Rich Dad Poor Dad by Robert Kiyosaki advocates financial literacy and independence through investing, real estate, owning businesses, and increasing one's financial intelligence.",
      brand: 'Manjul Publishing', price: 299, mrp: 525, discount: 43, stock: 600, rating: 4.6, rating_count: 67890, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp',
      ],
      specs: [['Author', 'Robert T. Kiyosaki'], ['Publisher', 'Manjul Publishing'], ['Pages', '336'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    {
      category_slug: 'books', name: 'The Alchemist', slug: 'the-alchemist-paulo-coelho',
      description: "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.",
      brand: 'HarperCollins', price: 249, mrp: 399, discount: 38, stock: 700, rating: 4.7, rating_count: 89340, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp',
      ],
      specs: [['Author', 'Paulo Coelho'], ['Publisher', 'HarperCollins'], ['Pages', '208'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    {
      category_slug: 'books', name: 'Wings of Fire: An Autobiography', slug: 'wings-of-fire-apj-kalam',
      description: 'Wings of Fire is the autobiography of A. P. J. Abdul Kalam, former President of India, covering his life from childhood to the chief of the DRDO.',
      brand: 'Universities Press', price: 179, mrp: 250, discount: 28, stock: 800, rating: 4.8, rating_count: 112450, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/2.webp',
      ],
      specs: [['Author', 'A.P.J. Abdul Kalam'], ['Publisher', 'Universities Press'], ['Pages', '196'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    {
      category_slug: 'books', name: 'Sapiens: A Brief History of Humankind', slug: 'sapiens-yuval-noah-harari',
      description: 'Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical — and sometimes devastating — breakthroughs of the Cognitive, Agricultural, and Scientific Revolutions.',
      brand: 'Harper', price: 399, mrp: 699, discount: 43, stock: 450, rating: 4.6, rating_count: 54320, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/2.webp',
      ],
      specs: [['Author', 'Yuval Noah Harari'], ['Publisher', 'Harper Perennial'], ['Pages', '443'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    {
      category_slug: 'books', name: 'The Intelligent Investor', slug: 'the-intelligent-investor',
      description: "Benjamin Graham's The Intelligent Investor is the definitive book on value investing. A book of practical counsel on the classic art of making money through superior financial discipline.",
      brand: 'HarperBusiness', price: 499, mrp: 899, discount: 44, stock: 350, rating: 4.7, rating_count: 38760, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp',
      ],
      specs: [['Author', 'Benjamin Graham'], ['Publisher', 'HarperBusiness'], ['Pages', '640'], ['Language', 'English'], ['Edition', 'Revised Edition']]
    },
    {
      category_slug: 'books', name: 'Zero to One by Peter Thiel', slug: 'zero-to-one-peter-thiel',
      description: "Peter Thiel's Zero to One presents his philosophy of contrarian thinking to discover value in unexpected places and build startups that create new things.",
      brand: 'Crown Business', price: 399, mrp: 699, discount: 43, stock: 300, rating: 4.5, rating_count: 29870, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp',
      ],
      specs: [['Author', 'Peter Thiel'], ['Publisher', 'Crown Business'], ['Pages', '224'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    {
      category_slug: 'books', name: "Harry Potter and the Philosopher's Stone", slug: 'harry-potter-philosophers-stone',
      description: "The first book in J.K. Rowling's Harry Potter series. Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive.",
      brand: 'Bloomsbury', price: 399, mrp: 599, discount: 33, stock: 900, rating: 4.9, rating_count: 145670, featured: true,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/2.webp',
      ],
      specs: [['Author', 'J.K. Rowling'], ['Publisher', 'Bloomsbury'], ['Pages', '352'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    {
      category_slug: 'books', name: 'Think and Grow Rich', slug: 'think-and-grow-rich',
      description: 'Napoleon Hill\'s Think and Grow Rich shares the secrets of achieving success through positive thinking, persistence, and the power of desire.',
      brand: 'Fingerprint Publishing', price: 199, mrp: 395, discount: 50, stock: 550, rating: 4.5, rating_count: 61230, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp',
      ],
      specs: [['Author', 'Napoleon Hill'], ['Publisher', 'Fingerprint Publishing'], ['Pages', '312'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    {
      category_slug: 'books', name: 'Deep Work by Cal Newport', slug: 'deep-work-cal-newport',
      description: 'Cal Newport argues that the ability to perform deep work is becoming increasingly rare and increasingly valuable in our economy.',
      brand: 'Grand Central Publishing', price: 349, mrp: 599, discount: 42, stock: 280, rating: 4.6, rating_count: 22450, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp',
      ],
      specs: [['Author', 'Cal Newport'], ['Publisher', 'Grand Central Publishing'], ['Pages', '304'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    {
      category_slug: 'books', name: 'The Lean Startup', slug: 'the-lean-startup',
      description: 'Eric Ries defines a startup as an organization dedicated to creating something new under conditions of extreme uncertainty, and shows how the lean startup approach works.',
      brand: 'Crown Business', price: 449, mrp: 750, discount: 40, stock: 320, rating: 4.4, rating_count: 18760, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp',
        'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp',
      ],
      specs: [['Author', 'Eric Ries'], ['Publisher', 'Crown Business'], ['Pages', '336'], ['Language', 'English'], ['Edition', 'Paperback']]
    },

    // ── Appliances (12) ───────────────────────────────────────────────────────
    {
      category_slug: 'appliances', name: 'LG 260L Double Door Refrigerator', slug: 'lg-260l-double-door-fridge',
      description: 'LG 260L frost-free double door refrigerator with Smart Inverter Compressor, Multi Air Flow, and Door Cooling+.',
      brand: 'LG', price: 28990, mrp: 39990, discount: 27, stock: 20, rating: 4.4, rating_count: 5670, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/2.webp',
      ],
      specs: [['Capacity', '260 L'], ['Type', 'Double Door Frost Free'], ['Compressor', 'Smart Inverter'], ['Star Rating', '3 Star'], ['Annual Energy', '233 kWh']]
    },
    {
      category_slug: 'appliances', name: 'Dyson V15 Detect Vacuum', slug: 'dyson-v15-detect',
      description: 'Dyson V15 Detect with laser dust detection, piezo sensor, and 60-minute run time. The most powerful Dyson cordless vacuum.',
      brand: 'Dyson', price: 52900, mrp: 62900, discount: 16, stock: 10, rating: 4.6, rating_count: 1230, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/2.webp',
      ],
      specs: [['Type', 'Cordless'], ['Run Time', '60 minutes'], ['Suction', '230 AW'], ['Filtration', 'Whole-machine HEPA'], ['Weight', '3.1 kg']]
    },
    {
      category_slug: 'appliances', name: 'Whirlpool 7.5 kg Front-Load Washing Machine', slug: 'whirlpool-7-5kg-front-load-wm',
      description: 'Whirlpool 7.5 kg 5 Star front-load washing machine with 6th Sense technology, steam wash, and in-built heater.',
      brand: 'Whirlpool', price: 34990, mrp: 47000, discount: 26, stock: 18, rating: 4.3, rating_count: 7890, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp',
      ],
      specs: [['Capacity', '7.5 kg'], ['Type', 'Front Load'], ['RPM', '1400'], ['Star Rating', '5 Star'], ['Programs', '21'], ['In-Built Heater', 'Yes']]
    },
    {
      category_slug: 'appliances', name: 'Voltas 1.5 Ton 5 Star Inverter AC', slug: 'voltas-1-5-ton-5-star-inverter-ac',
      description: 'Voltas 1.5 Ton 5 Star Inverter Split AC with Adjustable Inverter Compressor, 4-in-1 Adjustable Mode, and anti-dust filter.',
      brand: 'Voltas', price: 39990, mrp: 56000, discount: 29, stock: 22, rating: 4.2, rating_count: 11230, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
      ],
      specs: [['Capacity', '1.5 Ton'], ['Type', 'Split Inverter'], ['Star Rating', '5 Star'], ['Cooling', '5100W'], ['Annual Energy', '909.85 kWh'], ['Refrigerant', 'R32']]
    },
    {
      category_slug: 'appliances', name: 'Samsung 28L Convection Microwave', slug: 'samsung-28l-convection-microwave',
      description: 'Samsung 28L convection microwave with Slim Fry, ceramic enamel cavity, and HotBlast technology for crispy results.',
      brand: 'Samsung', price: 16490, mrp: 22590, discount: 27, stock: 30, rating: 4.3, rating_count: 8760, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
      ],
      specs: [['Capacity', '28 L'], ['Type', 'Convection'], ['Power', '900W'], ['Cavity', 'Ceramic Enamel'], ['Auto Cook Menus', '208']]
    },
    {
      category_slug: 'appliances', name: 'IFB 6 kg 5 Star Front Load Washing Machine', slug: 'ifb-6kg-front-load-wm',
      description: 'IFB 6 kg 5 Star Senator Plus front-load washing machine with Aqua Energie, crescent moon drum, and 8 wash programs.',
      brand: 'IFB', price: 27990, mrp: 39000, discount: 28, stock: 25, rating: 4.4, rating_count: 9870, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
      ],
      specs: [['Capacity', '6 kg'], ['Type', 'Front Load'], ['Star Rating', '5 Star'], ['RPM', '1000'], ['Programs', '8'], ['Aqua Energie', 'Yes']]
    },
    {
      category_slug: 'appliances', name: 'Havells Inspire 600W Mixer Grinder', slug: 'havells-inspire-600w-mixer-grinder',
      description: 'Havells Inspire 600W mixer grinder with 3 SS jars, overload protector, and 5-year motor warranty.',
      brand: 'Havells', price: 2799, mrp: 4495, discount: 38, stock: 90, rating: 4.3, rating_count: 24560, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/2.webp',
      ],
      specs: [['Power', '600W'], ['Jars', '3 (1.5L + 1L + 0.4L)'], ['Speed', '3 + Pulse'], ['Motor Warranty', '5 Years'], ['Material', 'Stainless Steel Jars']]
    },
    {
      category_slug: 'appliances', name: 'Crompton Aura Prime 48" Ceiling Fan', slug: 'crompton-aura-prime-ceiling-fan',
      description: 'Crompton Aura Prime 48-inch BEE star-rated ceiling fan with anti-dust technology and high-speed 320 RPM motor.',
      brand: 'Crompton', price: 2550, mrp: 3800, discount: 33, stock: 100, rating: 4.2, rating_count: 17890, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp',
      ],
      specs: [['Sweep', '1200 mm (48")'], ['RPM', '320'], ['Power', '75W'], ['Air Delivery', '220 CMM'], ['BEE Rating', '3 Star'], ['Anti Dust', 'Yes']]
    },
    {
      category_slug: 'appliances', name: 'Blue Star 20L RO Water Purifier', slug: 'blue-star-20l-ro-water-purifier',
      description: 'Blue Star 20L Stella RO+UV water purifier with 8-stage purification, MTDS controller, and auto-flush technology.',
      brand: 'Blue Star', price: 9990, mrp: 14990, discount: 33, stock: 50, rating: 4.3, rating_count: 12670, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/1.webp',
      ],
      specs: [['Tank Capacity', '20 L'], ['Technology', 'RO + UV + UF'], ['Stages', '8'], ['Input TDS', 'Up to 2000 ppm'], ['Flow Rate', '15 L/hr'], ['Auto Flush', 'Yes']]
    },
    {
      category_slug: 'appliances', name: 'Bajaj Majesty RCX3 Multifunction Rice Cooker', slug: 'bajaj-majesty-rcx3-rice-cooker',
      description: 'Bajaj Majesty 1.8L multifunction rice cooker with steaming, sautéing functions and detachable power cord.',
      brand: 'Bajaj', price: 1795, mrp: 2995, discount: 40, stock: 120, rating: 4.1, rating_count: 33450, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp',
      ],
      specs: [['Capacity', '1.8 L'], ['Power', '700W'], ['Functions', 'Cook, Steam, Sauté'], ['Inner Pot', 'Non-Stick Coated'], ['Cord', 'Detachable']]
    },
    {
      category_slug: 'appliances', name: 'Hindware Snowcrest 1.5T 3 Star Split AC', slug: 'hindware-snowcrest-1-5t-split-ac',
      description: 'Hindware Snowcrest 1.5 Ton 3 Star Inverter Split AC with 4-in-1 convertible modes, PM 2.5 filter, and auto clean function.',
      brand: 'Hindware', price: 32990, mrp: 46000, discount: 28, stock: 20, rating: 4.1, rating_count: 6780, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
      ],
      specs: [['Capacity', '1.5 Ton'], ['Type', 'Split Inverter'], ['Star Rating', '3 Star'], ['Convertible', '4-in-1'], ['PM Filter', 'PM 2.5'], ['Auto Clean', 'Yes']]
    },
    {
      category_slug: 'appliances', name: 'Panasonic 23L Solo Microwave Oven', slug: 'panasonic-23l-solo-microwave',
      description: 'Panasonic 23L solo microwave with 800W power, 6 auto cook menus, defrost function, and child lock safety.',
      brand: 'Panasonic', price: 6490, mrp: 9490, discount: 32, stock: 45, rating: 4.2, rating_count: 15340, featured: false,
      images: [
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp',
        'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
      ],
      specs: [['Capacity', '23 L'], ['Type', 'Solo Microwave'], ['Power', '800W'], ['Auto Cook Menus', '6'], ['Defrost', 'Yes'], ['Child Lock', 'Yes']]
    },
  ];

  for (const p of productsData) {
    // Get category id
    const catRes = await query('SELECT id FROM categories WHERE slug = $1', [p.category_slug]);
    if (catRes.rows.length === 0) continue;
    const categoryId = catRes.rows[0].id;

    // Upsert product (update all fields on conflict so re-runs are idempotent)
    const prodRes = await query(
      `INSERT INTO products (category_id, name, slug, description, brand, price, mrp, discount_percent, stock, rating, rating_count, is_featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       ON CONFLICT (slug) DO UPDATE SET
         category_id      = EXCLUDED.category_id,
         name             = EXCLUDED.name,
         description      = EXCLUDED.description,
         brand            = EXCLUDED.brand,
         price            = EXCLUDED.price,
         mrp              = EXCLUDED.mrp,
         discount_percent = EXCLUDED.discount_percent,
         stock            = EXCLUDED.stock,
         rating           = EXCLUDED.rating,
         rating_count     = EXCLUDED.rating_count,
         is_featured      = EXCLUDED.is_featured
       RETURNING id`,
      [categoryId, p.name, p.slug, p.description, p.brand, p.price, p.mrp, p.discount, p.stock, p.rating, p.rating_count, p.featured]
    );
    const productId = prodRes.rows[0].id;

    // Replace images and specs cleanly to avoid duplicates on re-runs
    await query('DELETE FROM product_images WHERE product_id = $1', [productId]);
    for (let i = 0; i < p.images.length; i++) {
      await query(
        `INSERT INTO product_images (product_id, image_url, display_order) VALUES ($1,$2,$3)`,
        [productId, p.images[i], i]
      );
    }

    await query('DELETE FROM product_specs WHERE product_id = $1', [productId]);
    for (const [key, val] of p.specs) {
      await query(
        `INSERT INTO product_specs (product_id, spec_key, spec_value) VALUES ($1,$2,$3)`,
        [productId, key, val]
      );
    }
  }

  // ─── Enrich product descriptions ────────────────────────────────────────────
  const richDescriptions = {
    // Mobiles
    'samsung-galaxy-s24-ultra': 'The Samsung Galaxy S24 Ultra is Samsung\'s most powerful flagship, built around a 6.8-inch QHD+ Dynamic AMOLED 2X display with 2600 nits peak brightness and 120Hz adaptive refresh. The Snapdragon 8 Gen 3 SoC paired with 12GB RAM enables seamless multitasking, gaming, and AI-powered features like Live Translate and Circle to Search. The quad camera is headlined by a 200MP OIS sensor with Adaptive Pixel technology, joined by a 12MP ultrawide and dual telephotos (3x and 5x periscope). The integrated S Pen with 2.8ms latency is perfect for note-taking, sketching, and creative work. Titanium armor frame, Gorilla Glass Armor, and IP68 rating ensure durability, while 5000mAh battery with 45W fast charging keeps you going all day.',
    'apple-iphone-15-pro': 'iPhone 15 Pro redefines professional performance with the all-new A17 Pro chip — the first 3nm chip in a smartphone — delivering console-quality gaming and on-device machine learning. The surgical-grade titanium frame is lighter and stronger than ever, wrapped around a 6.1-inch Super Retina XDR OLED with ProMotion adaptive refresh up to 120Hz. The customizable Action button replaces the mute switch, giving you instant access to any shortcut you choose. The pro camera system features a 48MP main sensor with second-generation OIS, a 12MP ultrawide, and a 12MP 5x optical zoom — the longest ever on an iPhone. ProRes video recording at 4K 60fps with Log encoding lets professionals grade footage directly on-device.',
    'oneplus-12': 'OnePlus 12 is engineered for enthusiasts who refuse to compromise — its 6.82-inch 2K ProXDR LTPO 3.0 display (1–120Hz adaptive) renders every detail with HDR10+ brilliance. The Snapdragon 8 Gen 3 paired with 12GB RAM ensures blazing performance for gaming, multitasking, and AI workloads. The Hasselblad-tuned triple camera — 50MP main (OIS), 48MP ultrawide, and 64MP 3x periscope telephoto — delivers Natural Colour Calibration and ProXDR imaging. 100W SUPERVOOC charging fills the 5400mAh battery from 0 to 100% in just 26 minutes, and 50W wireless charging keeps desk charging effortless. OxygenOS 14 provides a clean, fast, and highly customisable Android experience with 4 years of OS updates guaranteed.',
    'redmi-note-13-pro-plus': 'Redmi Note 13 Pro+ pushes mid-range photography boundaries with a 200MP OIS main sensor powered by the Sony IMX890 — delivering extraordinary detail in all lighting. The Dimensity 7200 Ultra processor handles demanding tasks with its 4nm efficiency architecture, paired with 8GB RAM and 256GB UFS 3.1 storage. The 6.67-inch flexible AMOLED display runs at 120Hz with 1800 nits peak brightness and Dolby Vision HDR. 120W HyperCharge fills the 5000mAh battery in under 20 minutes — one of the fastest in its class. IP68 rating and Corning Gorilla Glass Victus provide reliable protection against water, dust, and accidental drops.',
    'google-pixel-8-pro': 'Google Pixel 8 Pro is the most capable Google phone yet, powered by the custom Google Tensor G3 chip with Titan M2 security coprocessor for top-tier on-device AI and privacy. The 6.7-inch LTPO OLED display adjusts from 1 to 120Hz and hits up to 2400 nits outdoors. The triple camera — 50MP main with second-gen optical zoom, 48MP ultrawide, and 48MP 5x periscope telephoto — is backed by Google\'s computational photography magic including Best Take, Magic Eraser, and Photo Unblur. A built-in temperature sensor, 30W wired and 23W wireless charging, and IP68 waterproofing are all included. Seven years of OS and security updates guarantee exceptional long-term value.',
    'vivo-v30-pro-5g': 'Vivo V30 Pro 5G sets a benchmark for portrait photography with ZEISS-certified dual front cameras (50MP + 50MP) and a ZEISS rear system featuring a 50MP OIS main lens, 50MP portrait camera, and 8MP ultrawide. The Snapdragon 8s Gen 3 chip delivers flagship-level processing in a slim, curved-glass design. The 6.78-inch curved AMOLED with 120Hz refresh and 4500 nits peak brightness looks exceptional indoors and outdoors. Vivo\'s 80W FlashCharge refills the 5000mAh battery in just 38 minutes. FunTouch OS 14 based on Android 14 brings smart AI features, including ZEISS Style Portrait and Aura Light for professional-grade computational photography.',
    'realme-gt-5-pro': 'Realme GT 5 Pro is a flagship killer packing relentless performance into a striking design. The Snapdragon 8 Gen 3 chip with 12GB LPDDR5X RAM handles every workload effortlessly — from AAA gaming to heavy multitasking. The 6.78-inch 144Hz LTPO AMOLED display with 4500 nits peak brightness and Dolby Vision provides an immersive viewing experience. The camera trio — 50MP OmniVision OV50H main (OIS), 50MP ultrawide, and 8MP periscope — is tuned for detailed photography in any lighting. 100W SUPERVOOC charging replenishes the 5400mAh battery in 28 minutes; 50W wireless charging adds versatility. IP65 dust and water resistance completes the flagship credentials at a mid-range price.',
    'nothing-phone-2a': 'Nothing Phone 2a brings the brand\'s signature Glyph Interface — now with more glyphs and richer lighting patterns — to a highly accessible price point without sacrificing transparent aesthetic. The MediaTek Dimensity 7200 Pro chip ensures smooth, responsive performance for everyday use and gaming. The clean, bloatware-free Nothing OS 2.5 based on Android 14 is fast and focused, with 3 years of OS updates promised. The dual rear camera system (50MP + 50MP portrait) captures detailed stills and 4K video; the 32MP front camera handles selfies beautifully. A 5000mAh battery with 45W fast charging, in-display fingerprint sensor, and IP52 splash resistance make daily use seamless.',
    'samsung-galaxy-a55-5g': 'Samsung Galaxy A55 5G brings Galaxy AI features and a premium build to the mid-range segment. The 6.6-inch Super AMOLED display with 120Hz refresh and IP67 dust and water resistance (a first for this price range) make it stand out immediately. Exynos 1480 handles everyday tasks and multitasking competently, backed by 8GB RAM and 128GB UFS 2.2 storage with expandable memory support. Samsung promises 4 years of OS updates and 5 years of security patches for lasting value. The 50MP OIS main camera with Nightography features, 12MP ultrawide, and 5MP macro deliver versatile photography, while Samsung Knox provides enterprise-grade protection.',
    'motorola-edge-50-fusion': 'Motorola Edge 50 Fusion delivers a compelling package anchored by its 6.7-inch pOLED display running at 144Hz — silky smooth and gorgeous for media and gaming. Snapdragon 7s Gen 2 paired with 8GB RAM offers responsive, efficient performance. The 50MP OIS main camera with f/1.8 aperture captures sharp, detailed images in all lighting conditions, while the 13MP ultrawide broadens creative perspective. 68W TurboPower charging fills the 5000mAh battery from 0 to 100% in under 47 minutes. Motorola\'s near-stock Android 14 with 3 years of OS updates and ReadyFor desktop-mode multitasking set it apart from the competition. IP68 dust and water resistance adds solid durability credentials.',
    'poco-x6-pro-5g': 'Poco X6 Pro 5G is built to dominate mobile gaming — the Dimensity 8300 Ultra with 12GB LPDDR5 RAM and UFS 4.0 storage delivers some of the fastest read/write speeds in its class. The 6.67-inch AMOLED CrystalRes display at 120Hz with Dolby Vision makes games and videos look vivid and sharp. The 64MP IMX682 OIS main camera, 8MP ultrawide, and 2MP macro provide impressive photographic flexibility for the price. 67W turbo charging powers through the 5000mAh battery in about 46 minutes. MIUI 14 for POCO with 3 years of security updates runs smoothly on the powerful hardware. Corning Gorilla Glass 5 on front and back provides reliable everyday scratch resistance.',
    'iqoo-neo-9-pro': 'iQOO Neo 9 Pro is a powerhouse for performance-hungry users — the Snapdragon 8 Gen 3 with 12GB LPDDR5X RAM and VRam ensures top-tier gaming with sustained performance thanks to a large vapour chamber cooling system. The 144Hz Samsung AMOLED E7 display with 2772×1240 resolution, Dolby Vision, and up to 3000 nits peak brightness makes everything pop with exceptional clarity. The 50MP Sony IMX920 main sensor with OIS is one of the finest in its segment, paired with an 8MP ultrawide. 120W Ultra FlashCharge takes the 5160mAh battery from 0 to 100% in just 26 minutes — perfect for extended gaming sessions. Monster Gaming Mode reduces touch latency and prioritises system resources for esports titles.',
    // Electronics
    'sony-wh-1000xm5': 'Sony WH-1000XM5 headphones redefine the noise-canceling benchmark with the Integrated Processor V1 and two dedicated noise-canceling chips that suppress a wider range of frequencies than any previous WH model. The 30mm drivers with Soft Edge Diaphragm deliver exceptional audio quality across the full frequency range, and LDAC codec streams high-resolution audio wirelessly at up to 990kbps. Up to 30 hours of battery life with NC on, plus multipoint connection to two devices simultaneously, make these perfect for all-day productivity and travel. Speak-to-Chat automatically pauses music when you start talking; Quick Attention mode lets outside sounds in instantly. The redesigned headband has fewer parts for a lighter, more comfortable fit during extended wear.',
    'apple-macbook-air-m3': 'MacBook Air with M3 chip sets a new performance bar for the world\'s best-selling laptop. The 13.6-inch Liquid Retina display with 500 nits brightness, P3 wide colour, and True Tone delivers a stunning canvas for creative work. M3\'s 8-core CPU is up to 60% faster than M1, while the 10-core GPU now supports hardware ray tracing for immersive gaming. Up to 18 hours of battery means you can work all day and evening without plugging in — and the completely fanless design means absolute silence. Wi-Fi 6E, Bluetooth 5.3, two Thunderbolt/USB 4 ports, MagSafe 3, and a 3.5mm headphone jack with support for high-impedance headphones complete the connectivity story. Available in Midnight, Starlight, Space Grey, and Sky Blue.',
    'samsung-65-qled-tv': 'Samsung 65-inch QLED 4K Smart TV delivers an immersive cinematic experience powered by the Quantum Processor 4K, which upscales lower-resolution content to near-4K quality using AI. Quantum DOT technology produces 100% Color Volume for vibrant, accurate hues across the entire color spectrum in any room lighting. The 4K QLED panel with 120Hz native refresh eliminates motion blur for sports and gaming, while VRR support with AMD FreeSync Premium reduces screen tearing for console players. Tizen Smart OS integrates Samsung Health, SmartThings, and voice assistants (Alexa, Google Assistant, Bixby). Object Tracking Sound Pro creates multidimensional audio that moves with on-screen action. Multiple HDMI 2.1 and USB ports provide flexible connectivity for all devices.',
    'logitech-mx-master-3s': 'Logitech MX Master 3S is engineered for productivity — its high-precision 8,000 DPI optical sensor tracks perfectly on any surface, including glass. The electromagnetic MagSpeed scroll wheel clicks precisely or free-spins at 1000 lines per second, giving you line-by-line accuracy or ultra-fast page skimming at will. Logi Options+ lets you configure per-app button actions for over 200 applications. Silent click buttons reduce noise by 90% versus standard clicks without sacrificing tactile feedback. Connect up to 3 devices simultaneously and switch between them with the Easy-Switch button. Works over Bluetooth Low Energy or Logi Bolt USB receiver with up to 70-day battery life; a 1-minute quick charge provides 3 hours of use.',
    'dell-inspiron-15-laptop': 'Dell Inspiron 15 (2024) delivers reliable everyday performance powered by the Intel Core i5-1335U (13th Gen, 12 cores) with Intel Iris Xe graphics. The 15.6-inch FHD anti-glare display with 120Hz refresh provides smooth scrolling and responsive visuals — a significant upgrade from standard 60Hz panels at the same budget. 8GB DDR4 RAM (user-upgradeable to 32GB) and a 512GB M.2 NVMe SSD ensure snappy app launches and ample storage. The backlit keyboard, 720p webcam, and stereo speakers with Waves MaxxAudio Pro tuning make it a capable all-round machine for students and professionals. Wi-Fi 6 and Bluetooth 5.1 provide future-ready wireless connectivity with Windows 11 Home pre-installed.',
    'sony-wf-1000xm5-earbuds': 'Sony WF-1000XM5 earbuds deliver industry-leading noise canceling in truly wireless form — the Integrated Processor V2 and QN2e HD Noise Canceling Processor work in tandem to block ambient noise at unprecedented levels. The new 8.4mm Dynamic Driver X with Soft Edge Diaphragm provides expansive, high-resolution sound, and LDAC Bluetooth codec streams at up to 990kbps. Up to 8 hours in the bud (24 hours with charging case), IPX4 water resistance, and multipoint Bluetooth allow seamless device switching. Adaptive Sound Control automatically adjusts ambient sound settings based on your activity. The compact, lightweight design (5.9g per bud) with 11 ear tip options ensures a secure, all-day comfortable fit.',
    'samsung-galaxy-tab-s9-fe': 'Samsung Galaxy Tab S9 FE brings the Galaxy Tab ecosystem to enthusiasts at a more accessible price — the 10.9-inch TFT LCD at 90Hz, Exynos 1380 processor, and included S Pen offer a natural writing and creative experience. IP68 dust and water resistance (an industry-first for Fan Edition) means you can use it near pools, in the kitchen, or outdoors without worry. With 6GB RAM and 128GB storage (expandable via microSD), it handles schoolwork, streaming, and light creative tasks comfortably. The 10,090mAh battery delivers up to 13 hours of streaming; DeX mode transforms it into a desktop-class workspace when connected to an external display. Samsung Knox security and 4 years of OS updates make it a reliable long-term investment.',
    'boat-rockerz-450': 'boAt Rockerz 450 is one of India\'s most popular over-ear wireless headphones, combining quality audio with a wallet-friendly price. The 40mm dynamic drivers deliver deep bass, clear mids, and crisp highs with boAt\'s signature Immersive Audio signature. Bluetooth 5.0 with a 10m wireless range provides stable, stutter-free connectivity; up to 15 hours of playback on a single charge is enough for a full day of music and calls. The foldable design with carrying pouch makes it ideal for travel and daily commutes. A built-in microphone with voice assistant support lets you manage calls and queries hands-free. Available in multiple vibrant color options to match any style.',
    'asus-rog-zephyrus-g14-2024': 'ASUS ROG Zephyrus G14 2024 is the ultimate ultra-portable gaming laptop, packing an AMD Ryzen 9 8945HS (Zen 5) and NVIDIA GeForce RTX 4070 into a chassis weighing just 1.65kg. The 14-inch OLED display at 165Hz with 0.2ms response, Pantone Validated colour accuracy, and 100% DCI-P3 coverage looks stunning for gaming and creative work alike. ROG Arc Flow fans with 84-blade count and liquid metal thermal compound keep temperatures in check under sustained gaming loads. The customisable Anime Matrix mini-LED dot-matrix lid display makes it unique. Dolby Atmos audio, USB4, HDMI 2.1, and SD card reader make it a complete portable workstation. The 73Whr battery delivers 10+ hours of productivity between gaming sessions.',
    'jbl-charge-5-speaker': 'JBL Charge 5 combines room-filling JBL Pro Sound with a rugged, portable build designed for outdoor adventures. The newly engineered woofer driver and separate tweeter deliver exceptionally clear highs and powerful bass, and the JBL Portable app lets you customise the EQ to your preference. IP67 dust and waterproofing means it survives being submerged in up to 1 metre of water for 30 minutes — beach, pool, and rain ready. Up to 20 hours of playtime on a single charge; the built-in powerbank charges your devices on the go via USB-A. PartyBoost lets you wirelessly connect multiple compatible JBL speakers to amplify any occasion. Available in multiple vivid colours.',
    'apple-ipad-10th-gen': 'iPad 10th generation brings a fresh all-screen design to Apple\'s entry-level tablet — the 10.9-inch Liquid Retina display with wide colour P3 and True Tone sits edge-to-edge in a colourful anodised aluminium enclosure. The A14 Bionic chip with Neural Engine handles creative apps and augmented reality with ease. The landscape 12MP Ultra Wide front camera — centred perfectly for video calls in horizontal orientation — is one of the best tablet cameras for FaceTime, Zoom, and online classes. Wi-Fi 6 and optional 5G keep you connected at speed; USB-C enables fast charging and connects to a wide accessory ecosystem. Compatible with first-gen Apple Pencil and the USB-C Magic Keyboard Folio. Available in Blue, Pink, Yellow, and Silver.',
    'canon-eos-r50': 'Canon EOS R50 is a versatile mirrorless camera that bridges beginner-friendly and creator-ready. The 24.2MP APS-C BSI CMOS sensor captures sharp, detailed stills with outstanding low-light performance up to ISO 32000 expanded. Dual Pixel CMOS AF II with 651 AF zones and eye-detection tracking keeps subjects pin-sharp even in video. 4K 30p (with crop) or Full HD 120p slow-motion video enables cinematic content creation. Its compact, lightweight body (375g) and intuitive touchscreen are ideal for street photography, vlogging, and travel. The RF-S 18-45mm IS STM kit lens covers everyday focal lengths with built-in image stabilisation; Wi-Fi and Bluetooth enable seamless smartphone transfer and remote control.',
    // Fashion
    'levis-511-slim-fit-jeans': 'Levi\'s 511 Slim Fit jeans are a modern wardrobe essential that sits below the waist and tapers through the thigh and leg for a clean, versatile silhouette. Crafted from premium 99% cotton with 1% elastane for just enough stretch throughout the day, these jeans feel comfortable from morning commute to evening outings. Mid-rise waist, zipper fly, and five-pocket styling stay true to classic Levi\'s heritage. The authentic denim wash is achieved through Levi\'s WaterLess finishing process, which uses up to 96% less water than conventional denim washing — a greener choice for your wardrobe. Pairs equally well with sneakers, loafers, or boots across a wide range of wash shades.',
    'nike-air-max-270': 'Nike Air Max 270 features the brand\'s biggest heel Air unit yet — a full 270° of Air extending 32mm below the foot for a super-cushioned, ultra-responsive landing at every impact. The engineered mesh upper provides breathable, lightweight support that wraps the foot without unnecessary bulk. A lightweight foam midsole pairs with the Air Max heel for a smooth ride that transitions from gym to street effortlessly. The rubber outsole is placed strategically on high-wear zones for lasting traction on all surfaces. Inspired by the Air Max 180 and Air Max 93 silhouettes, the 270 combines retro styling with modern performance engineering for a head-turning, all-day look.',
    'arrow-formal-shirt': 'Arrow slim fit formal shirt is engineered for the modern professional — crafted from premium 2-ply 100% cotton pre-treated for wrinkle resistance and lasting colour vibrancy. The spread collar is structured to lie flat and frame a tie perfectly, while the placket and button alignment are precisely tailored for a crisp, sharp appearance. Slim-fit construction through the chest and torso provides a clean contoured silhouette without restricting movement. The fabric\'s Teflon coating repels minor spills, keeping you presentable throughout demanding days. Machine washable and easy to iron, Arrow shirts maintain their shape and colour through hundreds of washes. Available in a wide palette of solid, striped, and textured finishes.',
    'puma-men-polo-tshirt': 'Puma polo T-shirt is made from the brand\'s signature dryCELL moisture-wicking polyester fabric that moves sweat away from the skin to the surface where it evaporates quickly, keeping you cool and comfortable during intense activity or casual wear. The piqué texture provides a classic polo appearance while the four-way stretch fabric allows full freedom of movement for sports and everyday activities. A ribbed polo collar, three-button placket, and curved hem give it a polished, athletic silhouette that works on the pitch or at brunch. Flat-lock seams reduce irritation during extended movement. Regular fit suits a wide range of body types; the sublimated PUMA logo is understated and stylish.',
    'adidas-ultraboost-22': 'Adidas Ultraboost 22 is among the most technically advanced running shoes ever engineered — the BOOST midsole contains thousands of TPU energy capsules that compress and rebound with every step, returning 80% of energy input for propulsive, responsive performance across any distance. The Primeknit+ upper is constructed in a linear pattern that closely wraps the foot without seams for a second-skin fit, while the Linear Energy Push technology enhances forward propulsion. Continental rubber outsole provides outstanding grip on wet and dry surfaces at any pace or cadence. The moulded heel counter ensures secure lockdown; six months of real-world testing on roads and light trails went into refining this model for daily and long-distance running.',
    'allen-solly-women-kurta': 'Allen Solly women\'s straight fit kurta blends contemporary design with everyday comfort — the cotton blend fabric breathes naturally and resists wrinkling through long wear. Elegant geometric and floral prints are created with reactive dyes for lasting vibrancy that\'s gentle on skin. The three-quarter sleeves and knee-length straight hem make it versatile for office wear, casual outings, and semi-formal occasions. Pair with Allen Solly\'s printed palazzo or slim-fit trousers for a complete coordinated look. Machine washable at 30°C and quick-drying with minimal ironing required. Available in sizes XS to XXL across rotating seasonal print collections.',
    'raymond-slim-fit-blazer': 'Raymond slim fit blazer is crafted from a premium wool-rich blend with a luxurious hand-feel and natural drape that holds its shape throughout the day and into the evening. The single-breasted, two-button construction with notch lapels is a timeless silhouette appropriate for formal boardrooms, weddings, and evening events. Full satin-polyester lining ensures a smooth drape over a dress shirt; jetted lower pockets and a chest patch pocket complete the classic detailing. Slim-fit tailoring through the shoulders, chest, and waist creates a sharp silhouette without restricting movement. Colour-matched horn buttons and hand-stitched buttonholes reflect Raymond\'s six-decade legacy in premium Indian tailoring. Dry clean recommended to preserve fabric integrity.',
    'fossil-gen-6-smartwatch': 'Fossil Gen 6 bridges the gap between fashion timepiece and smart companion — powered by Snapdragon Wear 4100+ for fast performance and efficient power management. The circular 1.28-inch AMOLED display maintains Fossil\'s signature watch aesthetic while offering vibrant colour and an always-on display option. Wear OS by Google provides access to Google Pay, Google Assistant, Google Maps, and thousands of apps directly on your wrist. Continuous SpO2 and heart rate monitoring, stress tracking, and built-in GPS support comprehensive, phone-free outdoor workouts. 3 ATM water resistance, multiple interchangeable strap styles (leather, stainless steel, silicone), and over 7000 customisable watch faces make it as stylish as it is capable.',
    'rayban-wayfarer-classic': 'Ray-Ban Wayfarer Classic has been an icon of cool since 1956 and remains the world\'s best-selling sunglasses frame. Crafted from high-quality acetate with a distinctive trapezoidal shape, the Wayfarer has been worn by icons from James Dean to Lady Gaga across seven decades. Crystal G-15 lenses provide 100% UV-A and UV-B protection and reduce glare while preserving true-colour perception — the G-15 tint reduces brightness by 85% while maintaining a natural view of the world. Lenses are mounted with precision using iconic steel rivet detailing. Comes with a protective hard case and cleaning cloth. Available in classic Black, Tortoise, Blue Havana, and seasonal limited-edition colour variants.',
    'peter-england-chino-trousers': 'Peter England slim fit chino trousers in 100% combed cotton deliver a refined casual look that transitions easily from weekend brunch to smart-casual office environments. The mid-rise waist with zipper closure and hook-and-bar fastening sits comfortably without restricting movement. Flat-front design and two side pockets create a clean, modern profile; two back patch pockets add subtle definition. The cotton fabric is pre-washed for softness and minimal shrinkage — machine washable at 30°C. Available in neutral shades including khaki, navy, olive, grey, and stone that pair with almost any top in your wardrobe. The slim-fit cut tapers gently from hip to ankle for a contemporary, put-together silhouette.',
    'w-women-anarkali-kurta': 'W by Westside women\'s printed anarkali kurta brings traditional silhouette and modern artistic prints together for an effortlessly polished look. The flowing anarkali cut falls beautifully in the cotton blend fabric, creating an elegant swirl of fabric with each movement. Three-quarter sleeves are designed to be flattering across body types; the geometric and floral block prints use certified reactive dyes for skin safety and exceptional colour durability. Side seam pockets provide practical functionality for the modern woman. Pairs perfectly with W\'s churidar, sharara, or straight-fit pants and coordinating dupattas. Machine wash cold and line dry to maintain print vibrancy. Available in sizes XS to 3XL.',
    'mango-floral-midi-dress': 'Mango floral midi dress is crafted from lightweight 100% ECOVERO viscose — a sustainably produced fabric that\'s silky-soft against the skin and flows beautifully. The V-neckline flatters all bust sizes while the puffed short sleeves add a romantic, fashion-forward touch. An elasticated waist cinches the silhouette without restricting comfort, letting the skirt fall in graceful volume below the knee. The floral print is applied with water-based inks for sharp detail and wash-after-wash colorfastness. Pair with flat sandals for a daytime look or heeled mules for an evening event. Machine washable at 30°C; Mango continues to increase the proportion of sustainable materials across all collections each season.',
    // Home & Kitchen
    'prestige-induction-cooktop': 'Prestige PIC 3.0 V3 2000W induction cooktop brings speed, safety, and convenience to everyday cooking. The feather-touch control panel with LED indicator offers 8 power levels (200W to 2000W) without the risk of accidental gas leaks. The Auto Voltage Regulator maintains consistent heating even in fluctuating electricity areas, while automatic shut-off activates when no suitable cookware is detected. The easy-clean glass plate with a raised 3mm edge prevents spills from running over the sides. Compatible with all flat-based induction-friendly cookware with a minimum base diameter of 12cm. The slim, stackable profile stores easily; ISI and CE certified for complete safety assurance.',
    'milton-thermosteel-flask': 'Milton Thermosteel 1000ml flask combines premium double-wall vacuum insulation with a durable 18/8 food-grade stainless steel inner and outer body for maximum thermal retention. It keeps beverages genuinely hot for 24 hours and cold for 24 hours, tested at 95°C for hot and 5°C for cold in controlled conditions. The food-grade stainless steel lid doubles as a drinking cup; the leak-proof sealing ring prevents spills in bags and backpacks. The wide-mouth design accommodates ice cubes and sliced fruits for infused water preparation. Unlike plastic flasks, this body is completely BPA, lead, and phthalate-free. ISI marked and certified to Indian food-contact material standards for complete food safety.',
    'philips-hd9252-air-fryer': 'Philips HD9252 4.1L Digital Air Fryer uses patented Rapid Air Technology to circulate super-heated air around food at high speed, delivering crispy, golden results with up to 90% less fat than traditional deep frying — no pre-heating required. The digital display with 7 pre-set cooking programs (fries, frozen food, steak, poultry, fish, vegetables, dessert) takes the guesswork out of time and temperature. The detachable non-stick coated drawer and basket are dishwasher-safe for effortless cleanup. An integrated timer with ready alert and adjustable temperature from 80°C to 200°C give you precise control over results. At 4.1L this fryer comfortably serves 2–4 people — ideal for families and weekly meal preppers.',
    'instant-pot-duo-7-in-1': 'Instant Pot Duo 7-in-1 is the iconic multi-cooker that revolutionised home cooking worldwide. Its pressure cooker function reduces cooking time by up to 70% versus conventional methods, perfectly preparing beans, stocks, stews, and grains; the slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer modes make it a single-appliance kitchen. 14 one-touch smart programs offer pre-tested settings for popular dishes including rice, soup-broth, meat-stew, and cake. The stainless-steel inner pot is dishwasher-safe and Teflon-coating free. Over 10 built-in safety mechanisms — lid lock, pressure regulator, anti-spin, and steam release valve — make it one of the safest pressure cookers available. The 5.7L capacity comfortably feeds 6–8 people.',
    'borosil-glass-casserole-set': 'Borosil Vision Glass Casserole Set of 3 (0.5L, 1L, 1.5L) is crafted from premium borosilicate glass — the same material used in laboratory equipment — for exceptional resistance to thermal shock, scratches, and stains. Unlike regular soda-lime glass, borosilicate goes from freezer to microwave to oven (up to 180°C) without cracking. The air-tight snap-lock lids lock in freshness and prevent leaks; dishwasher-safe and microwave-safe (without lid). The crystal-clear body lets you see contents at a glance; stackable design saves refrigerator and cabinet space. Completely free from BPA, lead, and cadmium — safe for food contact at all temperatures. Perfect for meal prepping, storing leftovers, and serving directly on the dinner table.',
    'hawkins-contura-pressure-cooker-5l': 'Hawkins Contura 5L hard-anodised pressure cooker is scientifically designed for faster, healthier Indian cooking. The distinctive contura shape distributes heat efficiently across the base and sides to cook food faster than conventional vessels. Hard-anodised aluminium is non-toxic, harder than stainless steel, and provides a non-reactive, scratch-resistant cooking surface. The exclusive Gasket Release System (GRS) — a Hawkins innovation — allows excess pressure to escape safely below the lid, preventing accidents. Cool-to-touch handles with ergonomic grip ensure safe, comfortable handling at all times. ISI marked and fully compliant with IS 2347 Indian pressure cooker safety standards. Suitable for all stove types including gas, electric, and kerosene.',
    'cello-opalware-dinner-set-26pc': 'Cello Opalware 26-piece dinner set is crafted from high-quality opal glass — a non-porous, vitreous material naturally resistant to scratches, stains, and food odours. The elegant floral printed design is fired into the glass surface at over 600°C, permanently bonding with the material and ensuring it will never fade or peel through hundreds of dishwasher cycles. Microwave-safe, oven-safe up to 200°C, and freezer-safe — versatile for cooking, serving, and storing in one vessel. The 26-piece set includes 6 dinner plates, 6 small plates, 6 bowls, 6 quarter plates, and 2 serving bowls to cover all dining needs. Lightweight and stackable for practical everyday use, yet attractive enough for hosting guests.',
    'kent-cold-press-juicer': 'Kent Cold Press Juicer uses slow squeeze technology (80 RPM) rather than high-speed centrifugal blades — this cold extraction preserves enzymes, vitamins, and natural flavours destroyed by heat in conventional fast juicers, delivering nutrition-rich juice with better colour, more nutrients, and less oxidation. The 240W motor operates quietly and efficiently — suitable for early-morning use without disturbing others. The 1.5L juice jug and 0.8L pulp container provide generous bulk juicing capacity; the wide feed chute reduces prep time. All removable parts are BPA-free food-grade material and dishwasher-safe. Includes attachments for soft fruits, hard vegetables, wheatgrass, and nut milks, making it a complete wellness juicing solution.',
    'solimo-digital-kitchen-scale': 'Amazon Solimo digital kitchen scale eliminates guesswork from baking, coffee brewing, and portion control — its high-precision strain gauge sensor measures from 1g to 5000g in 1g increments for accurate results every time. The durable stainless steel weighing platform is easy to wipe clean and hygienic for direct food contact. The large backlit LCD display shows readings clearly even under varying kitchen lighting. The Tare/Zero function lets you subtract the weight of any container to measure only the ingredient you want. Auto shut-off after 2 minutes of inactivity extends the AAA batteries (included) significantly. The compact footprint fits neatly in a kitchen drawer for easy access whenever needed.',
    'pigeon-nonstick-cookware-set': 'Pigeon by Stovekraft 5-piece non-stick cookware set gives your kitchen a complete upgrade at an unmatched price. The set includes a 24cm kadhai with lid, a 25cm tawa, and a 2L saucepan with lid — covering all everyday Indian cooking needs. The 3-layer PTFE non-stick coating requires minimal oil, promotes healthier cooking outcomes, and enables effortless cleanup with only a soft sponge. Toughened glass lids trap steam for faster cooking while allowing you to monitor progress; Bakelite handles stay cool and comfortable throughout cooking. Compatible with gas and induction stoves for versatile placement. The hard-anodised base ensures scratch resistance and exceptional durability through years of regular use.',
    'wipro-9w-smart-led-bulb': 'Wipro 9W Wi-Fi Smart LED Bulb transforms any standard B22 or E27 fixture into a smart lighting node capable of 16 million RGBW colours. It produces 800 lumens at full brightness (equivalent to a 60W incandescent) with full dimming support from 1% to 100%. Control via the Wipro Smart Home app on iOS and Android, or use Amazon Alexa and Google Home for hands-free voice control. Create schedules, timers, and scenes — including Wake Up and Sleep modes — accessible from anywhere in the world. Energy savings of up to 85% over equivalent incandescent bulbs, with a rated lifespan of 25,000 hours (over 10 years of daily use). No hub or bridge required; connects directly to your 2.4GHz Wi-Fi network.',
    'nilkamal-chester-plastic-cabinet': 'Nilkamal Chester plastic cabinet is crafted from high-impact polypropylene — a lightweight, weather-resistant, and UV-stabilised plastic that will not rust, corrode, or warp even in humid bathroom or outdoor environments. The 4-shelf interior with lockable double doors keeps contents secure and dust-free; the standard key lock is easily replaceable. No tools are required for assembly — snap-and-lock joints come together in minutes without drilling or screwdrivers. Each shelf supports up to 30kg for a total structural capacity of 120kg. The slim footprint fits comfortably in bedrooms, bathrooms, kitchens, or garage utility areas. Available in multiple neutral colour options and backed by Nilkamal\'s extensive brand warranty.',
    // Books
    'atomic-habits-james-clear': 'Atomic Habits by James Clear is a practical, evidence-based guide to building good habits and breaking bad ones by focusing on 1% improvements each day. Drawing on neuroscience, psychology, and biology, Clear explains the Four Laws of Behavior Change: make it obvious, make it attractive, make it easy, and make it satisfying. The book introduces habit stacking, environment design, the two-minute rule, and identity-based habit formation — each a powerful lever for long-term behaviour change. Whether you want to exercise more consistently, eat healthier, or grow a skill, Atomic Habits gives you a proven system used by professional sports teams and Fortune 500 companies. Sold over 15 million copies worldwide and counting.',
    'psychology-of-money': 'The Psychology of Money by Morgan Housel collects 19 short, insight-packed chapters about the strange ways people think about money — covering topics no finance textbook ever addresses. Housel argues that financial success has less to do with intelligence or education than with behaviour, and that luck, risk, greed, and fear play a greater role in outcomes than spreadsheets suggest. Topics span the power of compounding, saving without a specific goal, the role of social comparison in spending, and why a margin of safety is more valuable than the maximum possible return. Written in plain language without jargon, it\'s equally accessible to someone new to investing and to a seasoned professional seeking perspective beyond the numbers.',
    'rich-dad-poor-dad': 'Rich Dad Poor Dad by Robert T. Kiyosaki has sold over 40 million copies and remains the #1 personal finance book worldwide. Through the contrasting stories of his own educated-but-poor father and his friend\'s uneducated-but-wealthy father, Kiyosaki challenges conventional beliefs about money, work, and employment. The core thesis: the wealthy don\'t work for money — they make money work for them by acquiring income-generating assets rather than accumulating liabilities. The book introduces the cash flow quadrant (Employee, Self-employed, Business owner, Investor), the concept of financial literacy versus academic literacy, and the critical importance of understanding tax law and investment vehicles. An essential philosophical foundation for anyone working towards financial independence.',
    'the-alchemist-paulo-coelho': 'The Alchemist by Paulo Coelho is a philosophical adventure novel and one of the best-selling books in history — translated into over 80 languages with 65 million copies sold worldwide. It follows Santiago, a young Andalusian shepherd boy who travels from Spain to the Egyptian pyramids in pursuit of a buried treasure he sees in a recurring dream. Along the way he meets a Gypsy fortune teller, a mysterious old king, a beautiful desert woman named Fatima, and an alchemist who teaches him the Soul of the World. Coelho weaves themes of destiny, self-discovery, and following the heart into a short, deeply moving narrative. A perfect gift for anyone who has ever felt the pull of an unfulfilled dream.',
    'wings-of-fire-apj-kalam': 'Wings of Fire: An Autobiography by A.P.J. Abdul Kalam (with Arun Tiwari) traces the remarkable journey of a boy from a humble fishing family in Rameswaram who became the Chief Scientific Adviser to the Government of India and the 11th President of the nation. The book covers Kalam\'s childhood influences, his transformative years studying aerospace engineering, his pivotal role in developing India\'s first satellite launch vehicle (SLV-3) and the Agni and Prithvi ballistic missiles, and his philosophy of national service, scientific curiosity, and youth empowerment. It is considered one of the most inspiring autobiographies ever written by an Indian author and has motivated generations of students, scientists, and professionals across the country.',
    'sapiens-yuval-noah-harari': 'Sapiens: A Brief History of Humankind by Yuval Noah Harari is a sweeping, provocative narrative of human history from the first Homo sapiens in Africa to the technological and bioengineering revolutions of the 21st century. Harari identifies three pivotal turning points: the Cognitive Revolution (~70,000 BCE), the Agricultural Revolution (~10,000 BCE, which he controversially calls History\'s Biggest Fraud), and the Scientific Revolution (~500 years ago). His central insight: what separates Sapiens from other animals is the ability to create and believe in \'inter-subjective myths\' — money, religion, nations, corporations — which enable mass cooperation at a scale no other species achieves. Witty, irreverent, and backed by rigorous scholarship, Sapiens challenges comfortable assumptions at every turn.',
    'the-intelligent-investor': 'The Intelligent Investor by Benjamin Graham, first published in 1949, is widely acknowledged as the greatest book on investing ever written — Warren Buffett called it \'by far the best book on investing ever written\' after reading it at age 19. Graham\'s central concept of \'Mr. Market\' — an irrational business partner who offers to buy and sell at wildly varying prices depending on his mood — teaches investors to be rational when markets are not. The book distinguishes between defensive investors (who want safety and minimal involvement) and enterprising investors (who have time and inclination to research undervalued opportunities). This revised edition includes updated commentary by Jason Zweig of The Wall Street Journal, applying Graham\'s principles to modern market events for contemporary relevance.',
    'zero-to-one-peter-thiel': 'Zero to One by Peter Thiel (co-founder of PayPal and Palantir) presents a compelling framework for building breakthrough companies that create new value rather than copying what already exists. Thiel argues that copying ideas takes the world from 1 to n — incremental progress — while truly innovative companies go from 0 to 1 by creating something genuinely new. His contrarian thesis asks: \'What important truth do very few people agree with you on?\' and argues that founders with compelling answers build the monopolies (sustainable, highly profitable businesses) of the future. The book covers startup culture, the role of secrets, the value of careful team selection, the importance of sales alongside product, and why definite optimism outperforms indefinite thinking.',
    'harry-potter-philosophers-stone': 'Harry Potter and the Philosopher\'s Stone by J.K. Rowling introduced the world to 11-year-old Harry Potter, who discovers on his birthday that he is a famous wizard and has been accepted to Hogwarts School of Witchcraft and Wizardry. Rowling\'s debut novel unfolds a richly imagined world of owls, cauldrons, Quidditch, moving staircases, and magical creatures, where Harry — raised in the cupboard under his unloving aunt and uncle\'s stairs — discovers the truth about his parents\' mysterious deaths and the dark legacy that follows him. The friendship between Harry, Hermione Granger, and Ron Weasley forms the emotional heart of a seven-book series that has sold over 600 million copies worldwide, defining the childhoods of multiple generations of readers.',
    'think-and-grow-rich': 'Think and Grow Rich by Napoleon Hill, first published in 1937, distils the principles behind the success of over 500 of America\'s most accomplished people — including Andrew Carnegie, Henry Ford, and Thomas Edison — into a 13-step philosophy of achievement. Hill argues that thought is the most powerful force in the universe, and that burning desire, faith, auto-suggestion, specialised knowledge, and organised planning consistently produce extraordinary results. The Master Mind Alliance concept — a carefully selected group of people working in harmony toward a common purpose — is central to his framework for accelerating success. Decades ahead of the positive psychology movement, Think and Grow Rich remains one of the best-selling self-help books in history and a foundational text for entrepreneurs and motivational thinkers worldwide.',
    'deep-work-cal-newport': 'Deep Work by Cal Newport makes a compelling case that the ability to focus intensely on cognitively demanding tasks — what Newport calls deep work — is becoming simultaneously rarer and more economically valuable in the modern knowledge economy. Newport argues that the rise of social media, instant messaging, and open-plan offices has created a culture of perpetual shallow distraction that prevents knowledge workers from producing their best, most valuable output. Drawing on stories of Carl Jung, Mark Twain, J.K. Rowling, and contemporary technology leaders, he outlines four philosophies of depth scheduling (monastic, bimodal, rhythmic, journalistic) and provides actionable rules for training attention, creating rituals, and embracing productive boredom. Essential reading for students, programmers, writers, and anyone whose best work requires sustained concentration.',
    'the-lean-startup': 'The Lean Startup by Eric Ries introduced a methodology that has reshaped how companies are built worldwide — from Silicon Valley startups to Fortune 500 innovation labs and government departments. Ries defines a startup as \'a human institution designed to create something new under extreme uncertainty\' and argues for validated learning over grand upfront plans: build a Minimum Viable Product (MVP), measure how real customers respond, and learn whether to pivot or persevere — completing this Build-Measure-Learn loop as fast as possible. Innovation accounting replaces vanity metrics (page views, downloads) with actionable metrics that reveal genuine customer value and help distinguish real traction from wishful thinking. Now taught at over 100 universities and adopted by accelerators including Y Combinator.',
    // Appliances
    'lg-260l-double-door-fridge': 'LG 260L GL-S292RDSY Frost-Free Double Door Refrigerator brings advanced Korean cooling technology to Indian kitchens. The Smart Inverter Compressor dynamically adjusts its speed to maintain precise temperatures rather than cycling on/off like a conventional compressor — reducing electricity consumption by up to 32% and operating noise significantly. Multi Air Flow sends cold air simultaneously to every corner of both the freezer and fresh food compartments, maintaining even temperatures throughout. Door Cooling+ technology controls the temperature at the door — the warmest part — reducing cold air loss by 41% each time the door opens. The Moist Balance Crisper with lattice pattern maintains optimal humidity to keep vegetables fresh up to 3x longer than conventional trays. Inverter Linear Compressor is backed by a remarkable 10-year warranty.',
    'dyson-v15-detect': 'Dyson V15 Detect is the most powerful and technologically advanced cordless vacuum Dyson has ever built. Breakthrough laser dust detection illuminates the floor with a precisely angled green laser that makes microscopic particles invisible to the naked eye dramatically visible, so you can see exactly what you\'re cleaning up on hard floors. The built-in piezo sensor at the wand end counts dust particles and automatically adjusts suction power in real time to provide exactly what the mess requires. 230 AW of suction in Boost mode (digital V15 motor spinning at 125,000 RPM) tackles the toughest embedded debris; in Auto mode it maximises run time up to 60 continuous minutes. Whole-machine HEPA filtration captures 99.99% of allergens and bacteria at 0.3 micron, expelling cleaner air than you breathe.',
    'whirlpool-7-5kg-front-load-wm': 'Whirlpool 7.5kg FreshCare+ H5 5-Star Front Load Washing Machine combines energy efficiency, advanced fabric care, and smart sensing in one appliance. FreshCare+ technology tumbles laundry intermittently for up to 6 hours after the wash cycle ends — preventing the musty odour that develops when clothes sit wet in the drum. Steam Wash penetrates fabric fibres to remove tough stains and kill allergens without harsh chemicals, gentle enough for everyday fabrics. The In-Built Heater maintains precise hot-water temperatures for cotton, heavily soiled, and hygiene wash programs. At 1400 RPM the spin extracts maximum water, cutting drying time significantly. The TurboWash feature completes a full wash cycle in just 30 minutes using concentrated water jets for lightly soiled, time-sensitive laundry.',
    'voltas-1-5-ton-5-star-inverter-ac': 'Voltas 1.5 Ton 185V JAT 5-Star Inverter Split AC is engineered for Indian climatic extremes — its All-Weather Cooling operates efficiently in ambient temperatures from -15°C to 52°C, making it suitable for the hottest Indian summers without performance degradation. The Adjustable Inverter Compressor modulates automatically between 30% and 110% capacity based on real-time cooling demand, delivering up to 55% energy savings over a standard fixed-speed AC. The 4-in-1 Convertible Mode lets you set cooling capacity to 40%, 60%, 80%, or 100% — ideal for partial room occupancy or mild weather. Anti-Dust Filter with auto-cleaning traps particles and can be rinsed clean; multi-stage filtration adds antibacterial and antifungal protection. R32 refrigerant has zero ODP and substantially lower global warming potential than older R410A refrigerant.',
    'samsung-28l-convection-microwave': 'Samsung 28L CE1041DSB2 Convection Microwave Oven is a kitchen multi-tasker that bakes, roasts, grills, and reheats with precision. HotBlast technology forces powerful hot air through multiple small holes via a fan and nozzle system, significantly reducing cooking time while achieving crispy, evenly browned results for pizza, chicken wings, and pastries. The patented ceramic enamel cavity is stronger than standard stainless steel, scratch-resistant, antibacterial, and easy to wipe clean. Slim Fry technology delivers deep-fried results using just one teaspoon of oil for healthier everyday cooking. 208 Auto Cook Menu items cover every Indian cooking need from dal and rice to halwa and fried snacks; a dough-raising function maintains the ideal fermentation temperature for homemade bread and idli batter.',
    'ifb-6kg-front-load-wm': 'IFB 6kg Senator Plus SX 5-Star Front-Load Washing Machine is engineered with IFB\'s patented Aqua Energie device that converts hard water into soft water using gentle electromagnetic waves — improving detergent lathering and helping calcium and magnesium residues rinse out completely, protecting fabric fibres over hundreds of washes. The crescent-moon-shaped drum perforations create smooth, wave-surfaced holes that cushion clothes as they tumble, preventing pilling, stretching, and colour bleeding. 8 wash programs cover delicates (silk, wool, baby clothes), everyday cottons, synthetics, quick wash in 28 minutes, and a dedicated drum clean cycle. 1000 RPM spin extracts a high proportion of water, cutting drying time and energy consumption. 4D washing ensures water reaches fabric from every angle for deep, thorough cleaning even with a full drum.',
    'havells-inspire-600w-mixer-grinder': 'Havells Inspire 600W Mixer Grinder brings professional-grade grinding performance to the home kitchen with a powerful motor equipped with advanced thermal cut-off protection that automatically shuts the appliance off before overloading can damage the motor, significantly extending service life. Three precision-crafted 18/8 stainless steel jars — 1.5L for wet grinding, 1L for dry grinding, and a 0.4L chutney jar with lock-in lid — handle every need from wet pastes and chutneys to coffee beans and dry spices. The ventilated body dissipates heat efficiently during extended grinding sessions; laser-cut, heat-treated blades maintain their sharpness through years of use. 3-speed control plus pulse function gives you fine texture control. Backed by a 5-year motor warranty and 2-year product warranty.',
    'crompton-aura-prime-ceiling-fan': 'Crompton Aura Prime 1200mm (48-inch) ceiling fan is powered by a high-performance 75W motor with BEE 3-Star energy rating, delivering an excellent 220 CMM air delivery — sufficient to effectively cool a medium to large-sized room without strain. Anti-Dust Technology applies an anti-static polymer coating to the blade surface that repels dust particles through electrostatic charge, keeping blades cleaner between washes and maintaining consistent airflow performance. Lead-free triple lacquer finishing provides lasting rust protection and a rich, durable surface appearance. Quiet operation at 320 RPM is achieved through precision-balanced blades and quality motor bearings — minimal noise even at maximum speed. Compatible with standard fan regulators and inverters; 2-year comprehensive warranty from Crompton Greaves.',
    'blue-star-20l-ro-water-purifier': 'Blue Star Stella RO+UV+UF 8-stage water purifier is designed for Indian municipal and borewell water sources with TDS up to 2000 ppm. The reverse osmosis membrane removes dissolved salts, heavy metals (arsenic, lead, fluoride, nitrates), and agricultural pesticides; UV disinfection inactivates viruses, bacteria, and cysts; UF membrane provides an additional safety barrier for microorganisms. The MTDS Mineral Enhancer controller blends a precise proportion of unfiltered mineral water back into the purified output — maintaining essential minerals and natural taste while ensuring safety. The 20L storage tank and 15 L/hour flow rate provide continuous supply for large families. Auto-flush every 24 hours keeps the RO membrane clean and extends its service life significantly.',
    'bajaj-majesty-rcx3-rice-cooker': 'Bajaj Majesty RCX3 1.8L multifunction rice cooker simplifies Indian cooking with three versatile modes: rice cooking with automatic switch-to-warm, steam cooking ideal for vegetables, idlis, and fish, and a sauté mode for tadka, bhuna, and shallow frying preparation. The non-stick coated aluminium inner pot prevents sticking without excessive oil; the flat base ensures even heat distribution for consistent cooking results every time. The detachable power cord reduces counter clutter and allows safe serving directly at the dining table. A tempered glass lid with steam vent lets you monitor cooking without releasing heat. Includes a steam basket, measuring cup, and serving spatula. BIS certified for electrical safety and backed by a 1-year warranty.',
    'hindware-snowcrest-1-5t-split-ac': 'Hindware Snowcrest 1.5T 3 Star HSS-18K3WNS Inverter Split AC delivers maximum versatility for Indian households — its 4-in-1 Convertible Technology allows you to choose 40%, 60%, 80%, or 100% cooling capacity based on occupancy, preventing energy wastage when the room is lightly occupied or the weather is mild. The PM 2.5 Filter captures ultra-fine particles down to 2.5 micrometres — including dust, pollen, smoke, and airborne bacteria — significantly improving indoor air quality for allergy and asthma sufferers. The Auto-Clean function blows the heat exchanger dry after shutdown, permanently preventing mould growth and bacterial build-up in the coils. HD Filter provides additional antibacterial protection on the evaporator surface. R32 refrigerant with zero ODP supports environmental responsibility. 5-year inverter compressor warranty included.',
    'panasonic-23l-solo-microwave': 'Panasonic 23L NN-E23JMF Solo Microwave Oven is a reliable, no-fuss everyday microwave for reheating, defrosting, and simple cooking. At 800W maximum output with 5 power levels, it handles everything from gentle melting at 100W and defrosting at 200W up to full-power cooking at 800W for Indian curries, dal, and steamed vegetables. Six Auto Cook menus — rice, dal, potato bake, pasta, fish, and popcorn — deliver optimally timed and powered cooking results at a single button press. The Express Defrost function calculates optimal thawing time and power level based on your input weight for uniform, safe defrosting. Child lock prevents accidental operation; the 23L cavity accommodates plates up to 13 inches in diameter. 2-year comprehensive product warranty included.',
  };
  let updatedCount = 0;
  for (const [slug, desc] of Object.entries(richDescriptions)) {
    const res = await query('UPDATE products SET description = $1 WHERE slug = $2', [desc, slug]);
    if (res.rowCount > 0) updatedCount++;
  }
  console.log(`Updated ${updatedCount} product descriptions.`);

  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
