const { Product } = require('../models');

const productData = [
  {
    product_name: 'Video 1',
    price: 9.99,
    stock: 14,
    category_id: 1,
  },
  {
    product_name: 'Video 2',
    price: 19.99,
    stock: 25,
    category_id: 5,
  },
  {
    product_name: 'Video 3',
    price: 29.99,
    stock: 12,
    category_id: 4,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;