const passport = require('passport')
const LocalStrategy = require('passport-local')
const db = require('../models')
const { User } = db
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  (req, email, password, cb) => {
    User.findOne({ where: { email: email } }).then(user => {
      if (!user) return cb(null, false, req.flash('error_message', 'Wrong email or password'))
      if (!bcrypt.compareSync(password, user.password)) return cb(null, false, req.flash('error_message', 'Wrong email or password'))
      return cb(null, user)
    })
  }
))

//序列化
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

//反序列化
passport.deserializeUser((id, cb) => {
  User.findByPk(id).then(user => {
    user = user.toJSON()
    return cb(null, user)
  })
})

module.exports = passport

