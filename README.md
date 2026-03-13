# Flipkart Clone - E-Commerce Platform

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A full-stack e-commerce web application replicating Flipkart's UI and core shopping experience.

**Assignment:** Scaler SDE Intern Fullstack Assignment

## 🔗 Live Demo and Repository Links
- Live Demo: *https://flipkart-clone-demo.vercel.app/*
- Backend API (Railway): *https://flipkartclone.up.railway.app*
- GitHub Repo: *https://github.com/anjalipatel-01/FlipkartClone*

### Homepage
<img width="1920" height="1080" alt="Flipkart" src="https://github.com/user-attachments/assets/6ca5fd74-a8f4-459e-9041-1c02bfe6ecd3" />


## ✨ Features

### Core Features
- Product listing with grid layout matching Flipkart's design
- Search by product name (debounced)
- Filter by category, price range, discount, rating
- Sort by relevance, price low-high, price high-low, rating
- Pagination
- Product detail page with image carousel
- Product specifications and description
- Add to Cart with quantity management
- Shopping cart with update/remove/clear
- Cart price summary with savings calculation
- Checkout with shipping address form (Indian states)
- Order placement with cart auto-clear
- Order confirmation page with estimated delivery date

### Bonus Features Implemented
- Fully responsive design (mobile, tablet, desktop)
- User authentication (JWT-based Login / Signup)
- Order history with full order detail view
- Wishlist with add/remove and move to cart
- Protected routes (redirect to login for cart/orders/wishlist)

## 🛠️ Tech Stack and Why It Was Chosen

### Frontend
- **React.js + Vite:** Chosen for fast development startup, excellent hot module replacement, SPA architecture, and reusable component-driven UI.
- **React Router v6:** Provides clean declarative routing, supports nested route composition, and enables protected route patterns for auth-based pages.
- **Tailwind CSS:** Utility-first styling accelerates responsive UI development and avoids heavy, fragmented CSS files.
- **Axios:** Offers cleaner request handling than native fetch in this use case, with interceptor support for centralized 401/auth handling.
- **React Context API:** Lightweight global state management for auth, cart, and wishlist without introducing Redux overhead for assignment scope.

### Backend
- **Node.js + Express.js:** Lightweight and performant runtime/framework combination with JavaScript across the full stack for productivity and consistency.
- **PostgreSQL:** Strong relational modeling for e-commerce entities and transactions, with ACID reliability for order/cart integrity.
- **node-postgres (pg):** Direct SQL control and transparency, avoiding ORM abstraction overhead while keeping queries explicit.
- **JWT + httpOnly cookies:** Stateless authentication with improved security posture against XSS token theft when compared to localStorage tokens.
- **bcryptjs:** Reliable industry-standard password hashing for secure credential storage.

### Deployment
- **Railway:** Simplifies Node.js + PostgreSQL hosting with convenient GitHub-based deploy workflows and free-tier friendliness.
- **Vercel:** Fast frontend deployments with preview links and a smooth CI/CD experience for React/Vite apps.

## 📁 Project Structure

```text
Flipkart/
|-- backend/
|   |-- package.json
|   |-- src/
|       |-- index.js
|       |-- controllers/
|       |-- db/
|       |   |-- index.js
|       |   |-- migration.sql
|       |   |-- schema.sql
|       |   |-- seed.js
|       |-- middlewares/
|       |-- routes/
|       |-- utils/
|
|-- frontend/
|   |-- package.json
|   |-- app/
|   |-- components/
|   |-- lib/
|   |-- public/
|   |-- eslint.config.mjs
|   |-- next.config.ts
|   |-- postcss.config.mjs
|   |-- tsconfig.json
|
|-- README.md
```

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js v18+
- PostgreSQL v14+
- Git
- A Gmail account with App Password enabled

### 1. Clone Repository
```bash
git clone <placeholder-repo-url>
cd Flipkart
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a backend `.env` file with the following variables:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/flipkart_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=flipkart_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRES_IN=7d
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Create your PostgreSQL database locally, then run:

```bash
# Requested command format:
psql -d flipkart_db -f schema.sql

# Requested command format:
node seeds/seed.js
```

If your project uses the current repository layout, run:

```bash
psql -d flipkart_db -f src/db/schema.sql
node src/db/seed.js
```

Start backend server:

```bash
npm run dev
```

Backend runs on: http://localhost:5000

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a frontend `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start frontend server:

```bash
npm run dev
```

Frontend runs on: http://localhost:5173

### 4. Open App
Visit: http://localhost:5173

Test credentials:
- Email: test@flipkart.com
- Password: password123

## 🔐 Environment Variables

### Backend .env

| Variable | Description | Example Value |
|---|---|---|
| DATABASE_URL | Full PostgreSQL connection string used by backend DB client | postgresql://postgres:postgres@localhost:5432/flipkart_db |
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_NAME | Database name | flipkart_db |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | postgres |
| JWT_SECRET | Secret key used to sign JWT tokens | super_secret_key_123 |
| JWT_EXPIRES_IN | JWT token validity duration | 7d |
| EMAIL_USER | Gmail account used for SMTP | your-email@gmail.com |
| EMAIL_PASS | Gmail App Password for SMTP authentication | abcd efgh ijkl mnop |
| PORT | Backend server port | 5000 |
| NODE_ENV | Runtime mode | development |
| FRONTEND_URL | Allowed frontend origin for CORS and cookie flow | http://localhost:5173 |

### Frontend .env

| Variable | Description | Example Value |
|---|---|---|
| VITE_API_BASE_URL | Base URL for all frontend API requests | http://localhost:5000/api |

## 🗄️ Database Schema Overview

<details>
<summary><strong>Click to expand full schema overview</strong></summary>

### Tables and Purpose

| Table | Key Columns | Purpose |
|---|---|---|
| users | id, name, email, password_hash, phone, gender, created_at | Stores registered user profiles and login identity data |
| categories | id, name, slug, image_url | Defines product categories used for browse/filter navigation |
| products | id, category_id, name, slug, description, brand, price, mrp, discount_percent, stock, rating, rating_count, is_featured | Stores core catalog information for each product |
| product_images | id, product_id, image_url, display_order | Stores multiple images per product for gallery/carousel display |
| product_specs | id, product_id, spec_key, spec_value | Stores flexible key-value technical specifications for products |
| cart | id, user_id, product_id, quantity, created_at | Stores active cart line items per user (one row per product per user) |
| cart_items | id, cart_id, product_id, quantity | Logical line-item representation commonly used in cart modeling |
| wishlists | id, user_id, product_id, created_at | Stores products bookmarked by users for later purchase |
| orders | id, user_id, total_amount, status, shipping_name, shipping_phone, shipping_address, shipping_city, shipping_state, shipping_pincode, created_at | Stores order headers and shipping details |
| order_items | id, order_id, product_id, quantity, unit_price, total_price | Stores individual purchased items linked to an order |

### Relationships (Plain English)
- A user can have many cart entries, many wishlist entries, and many orders.
- A category can have many products.
- A product can have many images and many specification records.
- Cart data links users to products with quantity.
- Wishlist data links users to products saved for later.
- An order belongs to a user and contains multiple order items.
- Each order item references one product snapshot with quantity and price details.

</details>

## 📡 API Endpoints Documentation

<details>
<summary><strong>Click to expand full endpoint documentation</strong></summary>

### Auth

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Register a new user |
| POST | /api/auth/login | No | Authenticate user and issue JWT cookie |
| POST | /api/auth/logout | No | Clear auth cookie and log user out |
| GET | /api/auth/me | Yes | Get current authenticated user profile |
| PUT | /api/auth/me | Yes | Update authenticated user profile |

### Products

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/products | Optional | Get paginated product list with search/filter/sort support |
| GET | /api/products/:id | Optional | Get detailed information for a single product |
| GET | /api/categories | No | Get all product categories |

### Cart

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/cart | Yes | Get current user's cart |
| DELETE | /api/cart | Yes | Clear entire cart |
| POST | /api/cart/items | Yes | Add item to cart |
| PUT | /api/cart/items/:id | Yes | Update cart item quantity |
| DELETE | /api/cart/items/:id | Yes | Remove single cart item |

### Wishlist

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/wishlist | Yes | Get current user's wishlist |
| POST | /api/wishlist | Yes | Add product to wishlist |
| GET | /api/wishlist/check/:product_id | Yes | Check whether product exists in wishlist |
| DELETE | /api/wishlist/:product_id | Yes | Remove product from wishlist |

### Orders

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | /api/orders | Yes | Place a new order and clear cart |
| GET | /api/orders | Yes | Get authenticated user's order history |
| GET | /api/orders/:id | Yes | Get full details for a specific order |

</details>

## 🔮 Future Improvements
- Redis caching for product listing and session management
- Rate limiting on auth routes (express-rate-limit + Redis)
- Payment gateway integration (Razorpay for Indian market)
- Real-time order tracking with WebSockets
- Product reviews and ratings system
- Admin dashboard for product/order management
- Image upload via Cloudinary or AWS S3
- Saved delivery addresses per user
- Coupon/promo code system

## ❤️ Footer
Made with ❤️ for Scaler SDE Intern Assignment
