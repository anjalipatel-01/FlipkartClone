const db = require('../db');
const { asyncHandler } = require('../middlewares/errorHandler');

// Helper: fetch full wishlist for a user
const fetchWishlist = (userId) =>
  db.query(
    `SELECT
       w.id,
       w.created_at,
       p.id          AS product_id,
       p.name        AS product_name,
       p.brand,
       p.price,
       p.mrp,
       p.discount_percent,
       p.stock,
       p.rating,
       (
         SELECT image_url FROM product_images
         WHERE product_id = p.id
         ORDER BY display_order ASC
         LIMIT 1
       ) AS thumbnail
     FROM wishlists w
     JOIN products p ON p.id = w.product_id
     WHERE w.user_id = $1
     ORDER BY w.created_at DESC`,
    [userId]
  );

// GET /api/wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const { rows } = await fetchWishlist(req.user.id);
  res.json({ success: true, data: rows });
});

// POST /api/wishlist  — body: { product_id }
const addToWishlist = asyncHandler(async (req, res) => {
  const { product_id } = req.body;

  if (!product_id) {
    return res.status(400).json({ success: false, message: 'product_id is required' });
  }

  const { rows: products } = await db.query(
    'SELECT id FROM products WHERE id = $1',
    [product_id]
  );
  if (!products.length) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  await db.query(
    `INSERT INTO wishlists (user_id, product_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, product_id) DO NOTHING`,
    [req.user.id, product_id]
  );

  const { rows } = await fetchWishlist(req.user.id);
  res.status(201).json({ success: true, data: rows });
});

// DELETE /api/wishlist/:product_id
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { product_id } = req.params;

  await db.query(
    'DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2',
    [req.user.id, product_id]
  );

  res.json({ success: true, message: 'Removed from wishlist' });
});

// GET /api/wishlist/check/:product_id
const checkWishlist = asyncHandler(async (req, res) => {
  const { product_id } = req.params;

  const { rows } = await db.query(
    'SELECT id FROM wishlists WHERE user_id = $1 AND product_id = $2',
    [req.user.id, product_id]
  );

  res.json({ success: true, data: { inWishlist: rows.length > 0 } });
});

module.exports = { getWishlist, addToWishlist, removeFromWishlist, checkWishlist };
