const users = require('../db/users.js')
const albums = require('../db/albums.js')
const router = require('express').Router()

let album_id

getAlbumId = (req, res, next) => {
  albums.getByTitle(title)
    .then(albums => {
      album_id = albums[0].album_id
      next()
    })
}

router.route('/new-review/:title')
  .get( (req, res) => {
    albums.getByTitle(req.params.title)
      .then( album => res.render('new-review', { album }) )
      .catch( error => res.status(500).render('error', { error } ) )
    })
  .post( (req, res) => {
    const user_id = req.session.user.user_id
    const content = req.body.content
    const album_id = req.body.album_id
    albums.createReview(user_id, album_id, content)
      .then( res.redirect( `/albums/${req.params.title}` ) )
      .catch( error => res.status(500).render('error', { error } ) )
  })

module.exports = router
