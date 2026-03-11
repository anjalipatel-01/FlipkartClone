const db = require('../db');
const { asyncHandler } = require('../middlewares/errorHandler');
const { sendOrderConfirmationEmail } = require('../utils/emailService');

// POST /api/orders  — body: { shipping_name, shipping_phone, shipping_address, shipping_city, shipping_state, shipping_pincode }
const placeOrder = asyncHandler(async (req, res) => {
  const {
    shipping_name,
    shipping_phone,
    shipping_address,
    shipping_city,
    shipping_state,
    shipping_pincode,
  } = req.body;

  if (!shipping_address) {
    return res.status(400).json({ success: false, message: 'shipping_address is required' });
  }

  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');

    // Fetch cart items with current product prices
    const { rows: cartItems } = await client.query(
      `SELECT c.id AS cart_id, c.product_id, c.quantity, p.price, p.stock, p.name AS product_name
       FROM cart c
       JOIN products p ON p.id = c.product_id
       WHERE c.user_id = $1
       FOR UPDATE`,
      [req.user.id]
    );

    if (!cartItems.length) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Validate stock for every item
    for (const item of cartItems) {
      if (item.stock < item.quantity) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product id ${item.product_id}`,
        });
      }
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    // Create the order
    const { rows: orders } = await client.query(
      `INSERT INTO orders
         (user_id, total_amount, status, shipping_name, shipping_phone,
          shipping_address, shipping_city, shipping_state, shipping_pincode)
       VALUES ($1, $2, 'placed', $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        req.user.id,
        totalAmount.toFixed(2),
        shipping_name   || null,
        shipping_phone  || null,
        shipping_address,
        shipping_city   || null,
        shipping_state  || null,
        shipping_pincode || null,
      ]
    );
    const order = orders[0];

    // Insert order_items and decrement stock
    for (const item of cartItems) {
      const totalPrice = Number(item.price) * item.quantity;
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, item.product_id, item.quantity, item.price, totalPrice.toFixed(2)]
      );
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    // Clear the cart
    await client.query('DELETE FROM cart WHERE user_id = $1', [req.user.id]);

    await client.query('COMMIT');

    // Fire-and-forget: send order confirmation email
    db.query('SELECT email, name FROM users WHERE id = $1', [req.user.id])
      .then(({ rows: users }) => {
        if (users.length) {
          const orderWithItems = {
            ...order,
            items: cartItems.map((i) => ({
              name:              i.product_name,
              quantity:          i.quantity,
              price_at_purchase: i.price,
            })),
            shipping_address,
          };
          sendOrderConfirmationEmail(users[0].email, users[0].name, orderWithItems);
        }
      })
      .catch(() => {});

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
});

// GET /api/orders
const getOrders = asyncHandler(async (req, res) => {
  const { rows } = await db.query(
    `SELECT id, total_amount, status, shipping_name, shipping_address,
            shipping_city, shipping_state, shipping_pincode, created_at
     FROM orders
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [req.user.id]
  );
  res.json({ success: true, data: rows });
});

// GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { rows: orders } = await db.query(
    'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
    [id, req.user.id]
  );

  if (!orders.length) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const order = orders[0];

  const { rows: items } = await db.query(
    `SELECT
       oi.id, oi.quantity, oi.unit_price, oi.total_price,
       p.id   AS product_id,
       p.name AS product_name,
       p.brand,
       (
         SELECT image_url FROM product_images
         WHERE product_id = p.id
         ORDER BY display_order ASC
         LIMIT 1
       ) AS thumbnail
     FROM order_items oi
     LEFT JOIN products p ON p.id = oi.product_id
     WHERE oi.order_id = $1
     ORDER BY oi.id ASC`,
    [id]
  );

  order.items = items;

  res.json({ success: true, data: order });
});

module.exports = { placeOrder, getOrders, getOrderById };
