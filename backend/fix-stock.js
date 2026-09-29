import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '../.env') });
import mongoose from 'mongoose';
import Product from './models/Product.js';

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');
    const res = await Product.updateMany({}, { stockCount: 15 });
    console.log('Updated:', res);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
