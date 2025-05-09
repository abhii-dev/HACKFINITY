const mongoose = require('mongoose');
const dotenv = require('dotenv');
const checkOverdueAndLowStock = require('./utils/checkOverDue');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected for cron job');
  await checkOverdueAndLowStock();
  mongoose.disconnect();
});
