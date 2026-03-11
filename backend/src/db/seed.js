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
    // Mobiles
    {
      category_slug: 'mobiles', name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra',
      description: 'The Samsung Galaxy S24 Ultra features a 6.8-inch QHD+ Dynamic AMOLED display, Snapdragon 8 Gen 3, 12GB RAM, and a 200MP quad camera system.',
      brand: 'Samsung', price: 124999, mrp: 134999, discount: 7, stock: 50, rating: 4.5, rating_count: 12450, featured: true,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/y/a/u/-original-imah2y7ygkuavhhs.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/4/n/1/-original-imah2y7y26hrghkz.jpeg',
      ],
      specs: [['Display', '6.8-inch QHD+ 120Hz'], ['Processor', 'Snapdragon 8 Gen 3'], ['RAM', '12 GB'], ['Storage', '256 GB'], ['Camera', '200MP + 12MP + 10MP + 10MP'], ['Battery', '5000 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'Apple iPhone 15 Pro', slug: 'apple-iphone-15-pro',
      description: 'iPhone 15 Pro features a titanium design, A17 Pro chip, 48MP main camera with 5x optical zoom, and USB 3 speeds.',
      brand: 'Apple', price: 119900, mrp: 134900, discount: 11, stock: 30, rating: 4.7, rating_count: 8920, featured: true,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/6/n/b/-original-imagtc97fgghjhff.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/t/x/s/-original-imagtc97xbgf5zgr.jpeg',
      ],
      specs: [['Display', '6.1-inch Super Retina XDR OLED'], ['Processor', 'A17 Pro'], ['RAM', '8 GB'], ['Storage', '128 GB'], ['Camera', '48MP + 12MP + 12MP'], ['Battery', '3274 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'OnePlus 12', slug: 'oneplus-12',
      description: 'OnePlus 12 features Snapdragon 8 Gen 3, 50MP Hasselblad camera, 100W SUPERVOOC charging, and a 6.82-inch ProXDR display.',
      brand: 'OnePlus', price: 64999, mrp: 69999, discount: 7, stock: 80, rating: 4.4, rating_count: 5630, featured: false,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/u/k/l/-original-imagtyyhhezhxfgp.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/l/g/b/-original-imagtyyhkq66sdrr.jpeg',
      ],
      specs: [['Display', '6.82-inch 2K ProXDR 120Hz'], ['Processor', 'Snapdragon 8 Gen 3'], ['RAM', '12 GB'], ['Storage', '256 GB'], ['Camera', '50MP + 48MP + 64MP'], ['Battery', '5400 mAh']]
    },
    {
      category_slug: 'mobiles', name: 'Redmi Note 13 Pro+', slug: 'redmi-note-13-pro-plus',
      description: 'Redmi Note 13 Pro+ sports a 200MP OIS camera, Dimensity 7200 Ultra processor, and 120W HyperCharge.',
      brand: 'Xiaomi', price: 29999, mrp: 34999, discount: 14, stock: 120, rating: 4.3, rating_count: 18750, featured: false,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/a/7/q/-original-imagr5g3t5qhahfp.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/k/m/3/-original-imagr5g3hneg5fzg.jpeg',
      ],
      specs: [['Display', '6.67-inch AMOLED 120Hz'], ['Processor', 'Dimensity 7200 Ultra'], ['RAM', '8 GB'], ['Storage', '256 GB'], ['Camera', '200MP + 8MP + 2MP'], ['Battery', '5000 mAh']]
    },
    // Electronics
    {
      category_slug: 'electronics', name: 'Sony WH-1000XM5 Headphones', slug: 'sony-wh-1000xm5',
      description: 'Industry-leading noise canceling headphones with 30-hour battery life, multipoint connection, and crystal clear hands-free calling.',
      brand: 'Sony', price: 24990, mrp: 29990, discount: 17, stock: 45, rating: 4.6, rating_count: 7840, featured: true,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/n/j/p/-original-imagtyq5vbdrgxzh.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/q/e/x/-original-imagtyq5xnqb53zt.jpeg',
      ],
      specs: [['Type', 'Over-ear'], ['Connectivity', 'Bluetooth 5.2, 3.5mm'], ['Battery', '30 hours'], ['ANC', 'Yes'], ['Weight', '250g']]
    },
    {
      category_slug: 'electronics', name: 'Apple MacBook Air M3', slug: 'apple-macbook-air-m3',
      description: 'MacBook Air with M3 chip, 13.6-inch Liquid Retina display, 18-hour battery life, and fanless design.',
      brand: 'Apple', price: 114900, mrp: 119900, discount: 4, stock: 25, rating: 4.8, rating_count: 4210, featured: true,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/laptop/h/6/s/-original-imagtyc3hyha9s53.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/laptop/j/o/p/-original-imagtyc3hjqh9syq.jpeg',
      ],
      specs: [['Processor', 'Apple M3'], ['RAM', '8 GB'], ['Storage', '256 GB SSD'], ['Display', '13.6-inch Liquid Retina'], ['Battery', '18 hours'], ['Weight', '1.24 kg']]
    },
    {
      category_slug: 'electronics', name: 'Samsung 65" 4K QLED TV', slug: 'samsung-65-qled-tv',
      description: 'Samsung 65-inch QLED 4K Smart TV with Quantum Processor, 100% Color Volume, and Alexa built-in.',
      brand: 'Samsung', price: 89999, mrp: 149900, discount: 40, stock: 15, rating: 4.4, rating_count: 3250, featured: true,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/television/d/q/f/-original-imagtyybzfgg3fgy.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/television/c/s/9/-original-imagtyybz595fszt.jpeg',
      ],
      specs: [['Screen Size', '65 inch'], ['Resolution', '4K UHD'], ['Refresh Rate', '120Hz'], ['Smart TV', 'Yes (Tizen OS)'], ['HDR', 'Quantum HDR+']]
    },
    {
      category_slug: 'electronics', name: 'Logitech MX Master 3S Mouse', slug: 'logitech-mx-master-3s',
      description: 'Advanced wireless mouse with 8K DPI sensor, MagSpeed scroll wheel, and ergonomic design for all-day comfort.',
      brand: 'Logitech', price: 9495, mrp: 10995, discount: 14, stock: 200, rating: 4.5, rating_count: 2860, featured: false,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/mouse/f/y/z/-original-imagpvyg8z3fdqzv.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/mouse/o/r/w/-original-imagpvyg882gkpsd.jpeg',
      ],
      specs: [['Connectivity', 'Bluetooth, USB-C'], ['DPI', '200 - 8000'], ['Battery', '70 days'], ['Buttons', '7'], ['Scroll', 'MagSpeed Electromagnetic']]
    },
    // Fashion
    {
      category_slug: 'fashion', name: 'Levi\'s 511 Slim Fit Jeans', slug: 'levis-511-slim-fit-jeans',
      description: 'Levi\'s 511 slim fit jeans sit below the waist and are slim through the thigh and leg. A timeless classic with a modern fit.',
      brand: 'Levi\'s', price: 2099, mrp: 3999, discount: 48, stock: 150, rating: 4.2, rating_count: 9876, featured: false,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/jean/p/p/g/-original-imagtyyhg5fyz5gz.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/jean/l/q/4/-original-imagtyyhgzb5fhd3.jpeg',
      ],
      specs: [['Fit', 'Slim'], ['Fabric', '99% Cotton, 1% Elastane'], ['Rise', 'Mid Rise'], ['Closure', 'Zipper'], ['Wash Care', 'Machine Wash']]
    },
    {
      category_slug: 'fashion', name: 'Nike Air Max 270 Sneakers', slug: 'nike-air-max-270',
      description: 'Nike Air Max 270 features Nike\'s biggest heel Air unit yet for a super-cushioned feel with a sleek modern look.',
      brand: 'Nike', price: 9995, mrp: 12995, discount: 23, stock: 80, rating: 4.5, rating_count: 6540, featured: true,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/l/e/d/-original-imagt4pyd3ygkg2t.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/l/h/p/-original-imagt4pydsgqhd4g.jpeg',
      ],
      specs: [['Material', 'Mesh + Synthetic'], ['Sole', 'Air Max Heel Unit'], ['Closure', 'Lace-up'], ['Occasion', 'Casual, Sports'], ['Weight', '310g']]
    },
    {
      category_slug: 'fashion', name: 'Arrow Formal Shirt', slug: 'arrow-formal-shirt',
      description: 'Arrow slim fit formal shirt crafted from premium wrinkle-resistant fabric. Perfect for office wear.',
      brand: 'Arrow', price: 1499, mrp: 2999, discount: 50, stock: 200, rating: 4.1, rating_count: 3420, featured: false,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/shirt/j/e/n/-original-imagtywhb5gz5yqh.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/shirt/m/j/y/-original-imagtywhbq4h5yzq.jpeg',
      ],
      specs: [['Fit', 'Slim'], ['Fabric', '100% Cotton'], ['Pattern', 'Solid'], ['Sleeve', 'Full Sleeve'], ['Collar', 'Spread Collar']]
    },
    // Home & Kitchen
    {
      category_slug: 'home-kitchen', name: 'Prestige Induction Cooktop', slug: 'prestige-induction-cooktop',
      description: 'Prestige 2000W induction cooktop with 8 power levels, auto voltage regulator, and push-button controls.',
      brand: 'Prestige', price: 1999, mrp: 3500, discount: 43, stock: 75, rating: 4.3, rating_count: 15670, featured: false,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/jz4y9aw0/induction-cook-top/g/v/u/prestige-pic-20-original-imaff8fhxhqhz4rg.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/jz4y9aw0/induction-cook-top/r/q/6/prestige-pic-20-original-imaff8fhyuhbzqeh.jpeg',
      ],
      specs: [['Power', '2000W'], ['Voltage', '230V'], ['Controls', 'Push Button'], ['Power Levels', '8'], ['Pan Size', 'Min 12cm, Max 26cm']]
    },
    {
      category_slug: 'home-kitchen', name: 'Milton Thermosteel Flask', slug: 'milton-thermosteel-flask',
      description: 'Milton Thermosteel 24-hour hot and cold flask with double wall insulation and leak-proof lid.',
      brand: 'Milton', price: 599, mrp: 1299, discount: 54, stock: 300, rating: 4.2, rating_count: 28450, featured: false,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/jvkz8y80/bottle/t/n/h/1000-thermosteel-duo-dlx-1000-ml-flask-milton-original-imaffk3wfwh6kqkz.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/jvkz8y80/bottle/w/w/m/1000-thermosteel-duo-dlx-1000-ml-flask-milton-original-imaffk3w8k2gdtmr.jpeg',
      ],
      specs: [['Capacity', '1000 ml'], ['Material', 'Stainless Steel'], ['Insulation', 'Double Wall'], ['Duration', '24 Hours Hot/Cold'], ['Lid', 'Stainless Steel']]
    },
    // Books
    {
      category_slug: 'books', name: 'Atomic Habits by James Clear', slug: 'atomic-habits-james-clear',
      description: 'A revolutionary system to get 1% better every day. The most comprehensive guide on how to change your habits and get 1% better every day.',
      brand: 'Penguin', price: 499, mrp: 799, discount: 38, stock: 500, rating: 4.8, rating_count: 45230, featured: true,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/kpifim80/book/x/8/z/atomic-habits-original-imag3k4zyhfjeep8.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/kpifim80/book/c/3/5/atomic-habits-original-imag3k4zs56ghcdc.jpeg',
      ],
      specs: [['Author', 'James Clear'], ['Publisher', 'Penguin Random House'], ['Pages', '320'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    {
      category_slug: 'books', name: 'The Psychology of Money', slug: 'psychology-of-money',
      description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel. A must-read for anyone interested in personal finance.',
      brand: 'Jaico Publishing', price: 349, mrp: 599, discount: 42, stock: 400, rating: 4.7, rating_count: 32100, featured: false,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/kuyf5ew0/book/3/s/0/the-psychology-of-money-original-imag7hcfvh5yfwwp.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/kuyf5ew0/book/o/f/b/the-psychology-of-money-original-imag7hcfzzh3cxg9.jpeg',
      ],
      specs: [['Author', 'Morgan Housel'], ['Publisher', 'Harriman House'], ['Pages', '256'], ['Language', 'English'], ['Edition', 'Paperback']]
    },
    // Appliances
    {
      category_slug: 'appliances', name: 'LG 260L Double Door Refrigerator', slug: 'lg-260l-double-door-fridge',
      description: 'LG 260L frost-free double door refrigerator with Smart Inverter Compressor, Multi Air Flow, and Door Cooling+.',
      brand: 'LG', price: 28990, mrp: 39990, discount: 27, stock: 20, rating: 4.4, rating_count: 5670, featured: false,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/refrigerator-new/a/r/d/-original-imagtyrhd5qpfzyz.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/refrigerator-new/v/7/e/-original-imagtyrhd3gtyzhb.jpeg',
      ],
      specs: [['Capacity', '260 L'], ['Type', 'Double Door Frost Free'], ['Compressor', 'Smart Inverter'], ['Star Rating', '3 Star'], ['Annual Energy', '233 kWh']]
    },
    {
      category_slug: 'appliances', name: 'Dyson V15 Detect Vacuum', slug: 'dyson-v15-detect',
      description: 'Dyson V15 Detect with laser dust detection, piezo sensor, and 60-minute run time. The most powerful Dyson cordless vacuum.',
      brand: 'Dyson', price: 52900, mrp: 62900, discount: 16, stock: 10, rating: 4.6, rating_count: 1230, featured: false,
      images: [
        'https://rukminim2.flixcart.com/image/416/416/xif0q/vacuum-cleaner/m/c/v/-original-imagthkdgqyz2gh5.jpeg',
        'https://rukminim2.flixcart.com/image/416/416/xif0q/vacuum-cleaner/t/o/y/-original-imagthkdhetzbhg5.jpeg',
      ],
      specs: [['Type', 'Cordless'], ['Run Time', '60 minutes'], ['Suction', '230 AW'], ['Filtration', 'Whole-machine HEPA'], ['Weight', '3.1 kg']]
    },
  ];

  for (const p of productsData) {
    // Get category id
    const catRes = await query('SELECT id FROM categories WHERE slug = $1', [p.category_slug]);
    if (catRes.rows.length === 0) continue;
    const categoryId = catRes.rows[0].id;

    // Insert product
    const prodRes = await query(
      `INSERT INTO products (category_id, name, slug, description, brand, price, mrp, discount_percent, stock, rating, rating_count, is_featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [categoryId, p.name, p.slug, p.description, p.brand, p.price, p.mrp, p.discount, p.stock, p.rating, p.rating_count, p.featured]
    );
    const productId = prodRes.rows[0].id;

    // Insert images
    for (let i = 0; i < p.images.length; i++) {
      await query(
        `INSERT INTO product_images (product_id, image_url, display_order) VALUES ($1,$2,$3)
         ON CONFLICT DO NOTHING`,
        [productId, p.images[i], i]
      );
    }

    // Insert specs
    for (const [key, val] of p.specs) {
      await query(
        `INSERT INTO product_specs (product_id, spec_key, spec_value) VALUES ($1,$2,$3)`,
        [productId, key, val]
      );
    }
  }

  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
