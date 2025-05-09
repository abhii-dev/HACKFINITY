const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const requestRoutes = require('./routes/requestRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const reportRoutes = require('./routes/reportRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reports', reportRoutes);

// DB Connection


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

connectDB();




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

