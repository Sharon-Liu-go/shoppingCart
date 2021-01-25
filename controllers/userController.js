const db = require('../models')
const { User } = db
const bcrypt = require('bcryptjs')

let userController = {
  getRegisterPage: (req, res) => {
    res.render('register')
  },

  register: (req, res) => {
    const { name, email, phone, password, passwordConfirm } = req.body
    if (password !== passwordConfirm) {
      req.flash('error_message', 'Different passwords！')
      return res.redirect('/register')
    } else {
      User.findOne({ where: { email: email } }).then(user => {
        if (user) {
          req.flash('error_message', 'The email has already existed！')
          return res.redirect('/register')
        } return User.create({
          name: name,
          email: email,
          phone: phone,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
        }).then(user => {
          req.flash('success_message', 'Successfully registered')
          res.redirect('/login')
        })
      })
    }
  },

  getLoginPage: (req, res) => {
    res.render('login')
  },

  login: (req, res) => {
    req.flash('success_message', 'Successfully login')
    return res.redirect('/')
  }


}

module.exports = userController