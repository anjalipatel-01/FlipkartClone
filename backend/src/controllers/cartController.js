const db = require('../db');
const { asyncHandler } = require('../middlewares/errorHandler');

// GET /api/cart
const getCart = asyncHandler(async (req, res) => {
  const { rows } = await db.query(
    `SELECT
       c.id,
       c.quantity,
       c.created_at,
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
     FROM cart c
     JOIN products p ON p.id = c.product_id
     WHERE c.user_id = $1
     ORDER BY c.created_at DESC`,
    [req.user.id]
  );

  const total = rows.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  res.json({ success: true, data: { items: rows, total: Number(total.toFixed(2)) } });
});

// POST /api/cart/items  — body: { product_id, quantity }
const addCartItem = asyncHandler(async (req, res) => {
  const { product_id, quantity = 1 } = req.body;

  if (!product_id) {
    return res.status(400).json({ success: false, message: 'product_id is required' });
  }
  if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
    return res.status(400).json({ success: false, message: 'quantity must be a positive integer' });
  }

  // Verify product exists and is in stock
  const { rows: products } = await db.query(
    'SELECT id, stock FROM products WHERE id = $1',
    [product_id]
  );
  if (!products.length) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  if (products[0].stock < 1) {
    return res.status(400).json({ success: false, message: 'Product is out of stock' });
  }

  // Upsert: if already in cart, increment quantity
  const { rows } = await db.query(
    `INSERT INTO cart (user_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, product_id)
     DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
     RETURNING *`,
    [req.user.id, product_id, quantity]
  );

  res.status(201).json({ success: true, data: rows[0] });
});

// PUT /api/cart/items/:id  — body: { quantity }
const updateCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
    return res.status(400).json({ success: false, message: 'quantity must be a positive integer' });
  }

  const { rows } = await db.query(
    `UPDATE cart SET quantity = $1
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
    [quantity, id, req.user.id]
  );

  if (!rows.length) {
    return res.status(404).json({ success: false, message: 'Cart item not found' });
  }

  res.json({ success: true, data: rows[0] });
});

// DELETE /api/cart/items/:id
const removeCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { rows } = await db.query(
    'DELETE FROM cart WHERE id = $1 AND user_id = $2 RETURNING id',
    [id, req.user.id]
  );

  if (!rows.length) {
    return res.status(404).json({ success: false, message: 'Cart item not found' });
  }

  res.json({ success: true, message: 'Item removed from cart' });
});

// DELETE /api/cart — clear entire cart
const clearCart = asyncHandler(async (req, res) => {
  await db.query('DELETE FROM cart WHERE user_id = $1', [req.user.id]);
  res.json({ success: true, message: 'Cart cleared' });
});

module.exports = { getCart, addCartItem, updateCartItem, removeCartItem, clearCart };
