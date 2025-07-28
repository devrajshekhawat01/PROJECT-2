const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
// const paymentRoutes = require('./routes/paymentRoutes.js');

dotenv.config();
// console.log(process.env)
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
