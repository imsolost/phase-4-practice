const router = require('express').Router()
const noAuth = require('./no-auth')
const user = require('./user')

router.use( (req, res, next) => {
  let loggedIn = false
  if (req.session.user) loggedIn = true
  res.locals = {loggedIn: loggedIn}
  next()
})

router.use('/', noAuth)
router.use('/', user)

module.exports = router
