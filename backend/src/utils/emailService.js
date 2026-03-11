const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmationEmail = async (userEmail, userName, order) => {
  try {
    const estimatedDelivery = new Date(
      new Date(order.created_at).getTime() + 6 * 24 * 60 * 60 * 1000
    ).toDateString();

    const itemsHtml = (order.items || [])
      .map(
        (item) => `
          <tr>
            <td style="padding:8px;border-bottom:1px solid #eee;">${item.name || item.product_name}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">₹${Number(item.price_at_purchase || item.unit_price).toFixed(2)}</td>
          </tr>`
      )
      .join('');

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#333;">
        <div style="background:#2874f0;padding:20px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Flipkart</h1>
        </div>
        <div style="padding:24px;">
          <h2>Order Confirmed!</h2>
          <p>Hi <strong>${userName}</strong>, thank you for your order.</p>

          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            <thead>
              <tr style="background:#f5f5f5;">
                <th style="padding:8px;text-align:left;">Product</th>
                <th style="padding:8px;text-align:center;">Qty</th>
                <th style="padding:8px;text-align:right;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <p style="text-align:right;font-size:16px;">
            <strong>Total: ₹${Number(order.total_amount).toFixed(2)}</strong>
          </p>

          <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />

          <p><strong>Order ID:</strong> #${order.id}</p>
          <p><strong>Shipping Address:</strong> ${order.shipping_address}</p>
          <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
        </div>
        <div style="background:#f5f5f5;padding:12px;text-align:center;font-size:12px;color:#888;">
          © ${new Date().getFullYear()} Flipkart Clone. All rights reserved.
        </div>
      </div>`;

    await transporter.sendMail({
      from: `"Flipkart" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Order Confirmed — Order #${order.id}`,
      html,
    });
  } catch (err) {
    console.error('[emailService] Failed to send order confirmation:', err.message);
    // Fire-and-forget: do not rethrow
  }
};

module.exports = { sendOrderConfirmationEmail };
