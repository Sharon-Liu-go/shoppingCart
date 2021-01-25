var express = require('express');
var router = express.Router();
const passport = require('../config/passport')

const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const orderController = require('../controllers/orderController')
const userController = require('../controllers/userController.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/products', productController.getProducts)

router.get('/cart', cartController.getCart)
router.post('/cart', cartController.postCart)
router.post('/cartItem/:id/add', cartController.addCartItem)
router.post('/cartItem/:id/sub', cartController.subCartItem)
router.delete('/cartItem/:id', cartController.deleteCartItem)

router.get('/orders', orderController.getOrders)
router.post('/order', orderController.postOrder)
router.post('/order/:id/cancel', orderController.cancelOrder)

router.get('/register', userController.getRegisterPage)
router.post('/register', userController.register)
router.get('/login', userController.getLoginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)
router.get('/logout', userController.logout)

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }))


module.exports = router;
