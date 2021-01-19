const db = require('../models')
const { Product } = db
const PAGE_OFFSET = 0
const PAGE_LIMIT = 3

let productController = {
  getProducts: (req, res) => {
    Product.findAndCountAll({ offset: PAGE_OFFSET, limit: PAGE_LIMIT, order: [['createdAt', 'DESC']], raw: true, nest: true }).then(products => {
      console.log(products)
      return res.render('products',
        { products })
    }
    )
  }
}

module.exports = productController