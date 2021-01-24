const db = require('../models')
const { User } = db

let userController = {
  getLoginPage: (req, res) => {
    res.render('login')
  },

  getRegisterPage: (req, res) => {
    res.render('register')
  },



}

module.exports = userController