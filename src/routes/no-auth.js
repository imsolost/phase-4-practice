const database = require('../db/database.js')
const users = require('../db/users.js')
const albums = require('../db/albums.js')
const moment = require('moment')
const router = require('express').Router()


getAlbums = (req, res, next) => {
  albums.getAll()
    .then(albums => {
      req.albums = albums
      next()
    })
}

getReviews = (req, res, next) => {
  albums.getRecentReviews()
    .then(reviews => {
      req.reviews = reviews
      next()
    })
}

renderIndex = (req, res, next) => {
  res.render('index', { albums: req.albums, reviews: req.reviews, moment })
}

router.get('/', getAlbums, getReviews, renderIndex)

router.route('/signup')
  .get( (req, res) => res.render('signup') )
  .post( (req, res) => {
    users.create(req.body.username, req.body.email, req.body.password)
      .then(res.redirect('/signin'))
      .catch( error => res.status(500).render('error', { error } ) )
  })

router.route('/signin')
  .get( (req, res) => res.render('signin') )
  .post( (req, res) => {
    const username = req.body.username
    users.getByUsername(username)
      .then( user => {
        if (req.body.password === user[0].password) {
          req.session.user = user[0]
          res.redirect(`/profile/${username}`)
        }
        else res.send('sorry, wrong password')
      })
      .catch( error => res.status(500).render('error', { error } ) )
  })

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.get('/profile/:username', (req, res) => {
  users.getByUsername(req.params.username)
    .then( reviews => res.render('profile', { reviews, moment }) )
    .catch( error => res.status(500).render('error', { error } ) )
})

router.get('/albums/:title', (req, res) => {
  albums.getByTitle(req.params.title)
    .then( album => res.render('album', { album, moment }) )
    .catch( error => res.status(500).render('error', { error } ) )
})

module.exports = router
