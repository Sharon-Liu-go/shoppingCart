const db = require('../models')
const { Cart, CartItem, Product, Order, OrderItem } = db

let orderController = {
  getOrders: (req, res) => {
    Order.findAll({ include: 'items' }).then(orders => {
      console.log(orders)
      res.render('orders', { orders })
    })
  }

}

module.exports = orderController