const express = require('express')
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth/routes');
const productRoutes = require('./routes/products/routes')
const categoryRoutes = require('./routes/category/routes')
const cartRoutes = require('./routes/cart/routes')
const orderRoutes = require('./routes/order/routes')
const adminRoutes = require('./routes/admin/routes')


const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// --- CORRECTED CORS CONFIGURATION ---
const allowedOrigins = [
  'http://localhost:5173', // Local dev
  process.env.CLIENT_URL   // Production (from Render env vars)
].filter(Boolean); // Filter out undefined/empty values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

