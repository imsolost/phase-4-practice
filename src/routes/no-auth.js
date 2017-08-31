const database = require('../db/database.js')
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
    const name = req.body.name
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    user.create(name, username, email, password)
      .then(res.redirect('/login'))
  })

router.route('/login')
  .get( (req, res) => res.render('login') )
  .post( (req, res) => {
    const username = req.body.username
    const password = req.body.password
    user.getByUsername(username)
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
