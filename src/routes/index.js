const router = require('express').Router()
const noAuth = require('./no-auth')
const user = require('./user')

router.use( (req, res, next) => {
  let loggedIn, username
  if (req.session.user) {
    loggedIn = true
    username = req.session.user.username
  }
  res.locals = { loggedIn: loggedIn, username: username || null }
  next()
})

router.use('/', noAuth)
router.use('/', user)

module.exports = router
