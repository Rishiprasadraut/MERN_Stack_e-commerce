# 🛒 ByteBazaar - MERN E-Commerce Platform

A full-stack e-commerce application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). Features include user authentication, product management, shopping cart, order processing, and an admin dashboard.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06B6D4?logo=tailwindcss)

---

## ✨ Features

### 👤 User Features
- **Authentication** - Register, Login, JWT-based sessions
- **Product Browsing** - Search, filter, and view product details
- **Shopping Cart** - Add/remove items, update quantities
- **Checkout** - Place orders with COD payment method
- **Order History** - View and cancel pending orders

### 🔐 Admin Features
- **Dashboard** - Admin control panel
- **Product Management** - Create, update, delete products with image upload
- **Order Management** - View all orders and update status (Pending → Shipped → Delivered)
- **Category Management** - Manage product categories

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Library |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 | Styling |
| Material UI | UI Components |
| Axios | HTTP client |
| Lucide React | Icons |
| Vite 7 | Build tool |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express 5 | Web framework |
| MongoDB + Mongoose 9 | Database |
| JWT | Authentication |
| Bcrypt.js | Password hashing |
| Cloudinary | Image storage |
| Multer | File upload handling |

---

## 📁 Project Structure

```
e-commerce/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/           # API service functions
│   │   ├── component/     # Reusable components
│   │   ├── context/       # React Context (Auth)
│   │   └── pages/         # Page components
│   │       ├── admin/     # Admin pages
│   │       ├── auth/      # Login & Register
│   │       └── user/      # User pages
│   └── package.json
│
├── server/                 # Express Backend
│   ├── config/            # Database & Cloudinary config
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Auth, Admin, Upload middleware
│   ├── model/             # Mongoose schemas
│   ├── routes/            # API routes
│   ├── utils/             # JWT utilities
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/e-commerce.git
cd e-commerce
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```

The app will be running at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (paginated) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user cart |
| POST | `/api/cart` | Add to cart |
| PUT | `/api/cart` | Update quantity |
| DELETE | `/api/cart/:productId` | Remove from cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/my` | Get user orders |
| POST | `/api/orders` | Place order |
| PUT | `/api/orders/:id/cancel` | Cancel order |
| GET | `/api/orders` | Get all orders (Admin) |
| PUT | `/api/orders/:id/status` | Update status (Admin) |

---

## 🖼️ Screenshots

> Add screenshots of your application here
Normal USER
<img width="1920" height="1080" alt="Screenshot 2026-02-18 144309" src="https://github.com/user-attachments/assets/beee3424-323f-4074-aac8-2b4b1b67b754" />

> <img width="1920" height="1080" alt="Screenshot 2026-02-18 144322" src="https://github.com/user-attachments/assets/b9a9063d-7d68-4473-ba21-b9a36d7cda61" />

<img width="1920" height="1080" alt="Screenshot 2026-02-18 144335" src="https://github.com/user-attachments/assets/79e6c32c-80c0-4572-a020-f2262a1e847c" />
<img width="1920" height="1080" alt="Screenshot 2026-02-18 144349" src="https://github.com/user-attachments/assets/74e81090-bb47-4285-9ed7-ca44ec24d397" />

Admin Panel

<img width="1920" height="1080" alt="Screenshot 2026-02-18 144447" src="https://github.com/user-attachments/assets/89fcc093-9819-4e88-8f1e-5f1369db6e56" />

<img width="1920" height="1080" alt="Screenshot 2026-02-18 144459" src="https://github.com/user-attachments/assets/b2d057c8-8625-462f-b05a-a76c01e3aa0f" />

<img width="1920" height="1080" alt="Screenshot 2026-02-18 144515" src="https://github.com/user-attachments/assets/4b1ffa9d-1405-4054-b71a-f87027ffb2f0" />

<img width="1920" height="1080" alt="Screenshot 2026-02-18 144531" src="https://github.com/user-attachments/assets/b86feabc-afcc-4c60-8f7c-ed35f250cab5" />




---
