const db = require('../models')
const { Cart, CartItem, Product } = db


let cartController = {
  getCart: (req, res) => {
    return Cart.findByPk(req.session.cartId, { include: 'items' }).then(cart => {
      cart = cart || { items: [] }
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
  postCart: async (req, res) => {
    const [cart, created] = await Cart.findOrCreate({
      where: {
        id: req.session.cartId || 0,
      },
    })
    const [cartItem, itemCreated] = await CartItem.findOrCreate({
      where: {
        CartId: cart.id,
        ProductId: req.body.productId
      },
      default: {
        CartId: cart.id,
        ProductId: req.body.productId,
      }
    })
    return cartItem.update({
      quantity: (cartItem.quantity || 0) + 1,
    })
      .then((cartItem) => {
        req.session.cartId = cart.id
        return req.session.save(() => {
          return res.redirect('back')
        })
      })
  }
}


module.exports = cartController
