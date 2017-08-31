const database = require('../db/database.js')
const users = require('../db/users.js')
const router = require('express').Router()

router.get('/', (req, res) => {
  database.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('error', { error: error })
    } else {
      res.render('index', { albums: albums })
    }
  })
})

router.route('/signup')
  .get( (req, res) => res.render('signup') )
  .post( (req, res) => {
    users.create(req.body.username, req.body.email, req.body.password)
      .then(res.redirect('/profile'))
  })

router.route('/signin')
  .get( (req, res) => res.render('signin') )
  .post( (req, res) => {
    const username = req.body.username
    const password = req.body.password
    users.getByUsername(username)
      .then(user => {
        if (password === user[0].password) {
          req.session.user = user[0]
          res.redirect(`/profile/${username}`)
        }
        else res.send('sorry, wrong password')
      })
  })

router.get('/albums/:albumID', (req, res) => {
  const albumID = req.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', { error: error })
    } else {
      const album = albums[0]
      res.render('album', { album: album })
    }
  })
})

module.exports = router
