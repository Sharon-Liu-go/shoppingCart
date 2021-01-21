const db = require('../models')
const { Cart, CartItem, Product, Order, OrderItem } = db
const nodemailer = require('nodemailer');


let orderController = {
  getOrders: (req, res) => {
    Order.findAll({ include: 'items' }).then(orders => {
      orders = orders.map(items => ({
        ...items.dataValues
      }))
      res.render('orders', { orders })
    })
  },

  postOrder: (req, res) => {
    const { name, phone, address, cartId, amount, shipping_status, payment_status } = req.body
    return Cart.findByPk(cartId, { include: 'items' }).then(cart => {
      return Order.create({
        name: name,
        address: address,
        phone: phone,
        shipping_status: shipping_status,
        payment_status: payment_status,
        amount: amount,
      }).then(order => {

        let results = [];
        for (let i = 0; i < cart.items.length; i++) {
          results.push(
            OrderItem.create({
              OrderId: order.id,
              ProductId: cart.items[i].id,
              price: cart.items[i].price,
              quantity: cart.items[i].CartItem.quantity,
            })
          );
        }

        return Promise.all(results).then(() =>
          res.redirect('/orders')
        );
      })
    })
  },

  cancelOrder: (req, res) => {
    return Order.findByPk(req.params.id, {}).then(order => {
      order.update({
        ...req.body,
        shipping_status: '-1',
        payment_status: '-1',
      }).then(order => {
        return res.redirect('back')
      })
    })
  },
  getPayment: (req, res) => {
    console.log('===== getPayment =====')
    console.log(req.params.id)
    console.log('==========')

    return Order.findByPk(req.params.id, {}).then(order => {
      return res.render('payment', { order })
    })
  },
  newebpayCallback: (req, res) => {
    console.log('===== newebpayCallback =====')
    console.log(req.body)
    console.log('==========')

    return res.redirect('back')
  }

}

module.exports = orderController