const db = require('../db');
const { asyncHandler } = require('../middlewares/errorHandler');

// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const { search, category, sort, minRating } = req.query;

  const params = [];
  const conditions = [];

  let sql = `
    SELECT
      p.id, p.name, p.slug, p.brand, p.price, p.mrp,
      p.discount_percent, p.stock, p.rating, p.rating_count,
      p.is_featured, p.created_at,
      c.id   AS category_id,
      c.name AS category_name,
      c.slug AS category_slug,
      (
        SELECT image_url FROM product_images
        WHERE product_id = p.id
        ORDER BY display_order ASC
        LIMIT 1
      ) AS thumbnail
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
  `;

  if (search) {
    params.push(`%${search}%`);
    conditions.push(
      `(p.name ILIKE $${params.length} OR p.brand ILIKE $${params.length} OR p.description ILIKE $${params.length} OR c.name ILIKE $${params.length})`
    );
  }

  if (category) {
    params.push(category);
    conditions.push(`c.slug = $${params.length}`);
  }

  if (minRating !== undefined && minRating !== '') {
    const parsedRating = parseFloat(minRating);
    if (!Number.isNaN(parsedRating)) {
      params.push(parsedRating);
      conditions.push(`p.rating >= $${params.length}`);
    }
  }

  if (conditions.length) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  const orderMap = {
    price_asc:  'p.price ASC',
    price_desc: 'p.price DESC',
    rating:     'p.rating DESC',
  };
  sql += ' ORDER BY ' + (orderMap[sort] || 'p.created_at DESC');

  const { limit } = req.query;
  if (limit) {
    const n = parseInt(limit, 10);
    if (n > 0) {
      params.push(n);
      sql += ` LIMIT $${params.length}`;
    }
  }

  const { rows } = await db.query(sql, params);

  res.json({ success: true, data: rows });
});

// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { rows: products } = await db.query(
    `SELECT
       p.*,
       c.name AS category_name,
       c.slug AS category_slug
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     WHERE p.id = $1`,
    [id]
  );

  if (!products.length) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const product = products[0];

  const [{ rows: images }, { rows: specs }] = await Promise.all([
    db.query(
      'SELECT id, image_url, display_order FROM product_images WHERE product_id = $1 ORDER BY display_order ASC',
      [id]
    ),
    db.query(
      'SELECT id, spec_key, spec_value FROM product_specs WHERE product_id = $1 ORDER BY id ASC',
      [id]
    ),
  ]);

  product.images = images;
  product.specs  = specs;

  res.json({ success: true, data: product });
});

// GET /api/categories
const getCategories = asyncHandler(async (req, res) => {
  const { rows } = await db.query(
    'SELECT id, name, slug, image_url FROM categories ORDER BY name ASC'
  );
  res.json({ success: true, data: rows });
});

module.exports = { getProducts, getProductById, getCategories };
