const db = require('../models')
const { Cart, CartItem, Product } = db


let cartController = {
  getCart: (req, res) => {
    return Cart.findOne({ include: 'items' }).then(cart => {
      cart = cart.items.map(items => ({
        ...items.dataValues,
        itemId: items.CartItem.id,
        quantity: items.CartItem.quantity
      }))
      let totalPrice = cart.length > 0 ? cart.map(d => d.price * d.quantity).reduce((a, b) => a + b) : 0
      return res.render('cart', {
        cart,
        totalPrice
      })
    })
  },
}


module.exports = cartController
