
module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    } else {
      req.flash('error_message', 'Please login first')
      return res.redirect('/login')
    }
  }
}  