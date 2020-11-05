const router = require('express').Router();
const productRoutes = require('./product-routes');
const homeRoutes = require('./home-routes.js');

router.use('/products', productRoutes);
router.use('/', homeRoutes);
module.exports = router;