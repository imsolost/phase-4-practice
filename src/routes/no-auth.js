const users = require('../db/users.js')
const albums = require('../db/albums.js')
const moment = require('moment')
const router = require('express').Router()
const {encryptPassword, comparePasswords} = require('../utils/bcrypt')


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
  res.render('index', { albums: req.albums, reviews: req.reviews, moment, query: null })
}

router.get('/', getAlbums, getReviews, renderIndex)

router.route('/signup')
  .get( (req, res) => res.render('signup') )
  .post( (req, res) => {
    encryptPassword(req.body.password)
      .then( encryptedPass => {
        users.create(req.body.username, req.body.email, encryptedPass)
          .then( () => {
            req.session.user = { username: req.body.username }
            req.session.save( res.redirect(`/profile/${req.body.username}`) )
          })
          .catch( error => res.status(500).render('error', { error } ) )
      })
  })

router.route('/signin')
  .get( (req, res) => res.render('signin') )
  .post( (req, res) => {
    const username = req.body.username
    users.getByUsername(username)
      .then( user => {
        comparePasswords(req.body.password, user[0].password)
          .then( boolean => {
            if (boolean) {
              req.session.user = user[0]
              req.session.save( res.redirect(`/profile/${username}`) )
            } else res.send('sorry, wrong password')
          })
          .catch( error => res.status(500).render('error', { error } ) )
      })
  })

router.get('/logout', (req, res) => {
    req.session.destroy( res.redirect('/') )
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

router.get('/search', (req, res, next) => {
  const query = req.query.q
  albums.search(query)
    .then( (albums) => {
      if (albums) return res.render('index', { albums, query, reviews: [''], moment })
      next()
    })
    .catch( error => res.status(500).render('error', { error } ) )
})

module.exports = router
