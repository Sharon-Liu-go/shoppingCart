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
  },

  logout: (req, res) => {
    req.logout()
    req.flash('success_message', 'Successfully logout')
    return res.redirect('/')
  },

  getSelfProfile: (req, res) => {
    User.findByPk(req.params.id, { nest: true, raw: true }).then(user => {
      res.render('selfProfile', { user })
    })
  },

  editSelfProfile: (req, res) => {
    const id = req.params.id
    User.findByPk(id).then(user => {
      user.update(req.body).then(user => {
        req.flash('success_message', 'Successfully save change')
        res.redirect(`/selfProfile/${id}`)
      })
    })
  },

  resetPasswordPage: (req, res) => {
    res.render('passwordSetting')
  },

  resetPassword: (req, res) => {
    const id = req.params.id
    const { oldPassword, newPassword, newPasswordConfirm } = req.body
    User.findByPk(id, { attributes: ['id', 'password'] }).then(user => {
      if (!bcrypt.compareSync(oldPassword, user.dataValues.password)) {
        req.flash('error_message', 'Origin password is incorrect')
        return res.redirect(`/passwordSetting/${id}`)
      }

      if (newPassword !== newPasswordConfirm) {
        req.flash('error_message', 'new password and new password confirmation are different')
        return res.redirect(`/passwordSetting/${id}`)
      }

      return user.update({
        password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10), null)
      }).then(user => {
        req.flash('success_message', 'Successfully save change')
        res.redirect(`/selfProfile/${id}`)
      })
    })
  }
}

module.exports = userController