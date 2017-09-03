const albums = require('../db/albums.js')
const router = require('express').Router()

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

router.get('/delete/:review_id', (req, res) => {
  const review_id = req.params.review_id
  albums.deleteReview(review_id)
    .then( res.redirect(`/profile/${res.locals.username}`) )
    .catch( error => res.status(500).render('error', { error } ) )
})

module.exports = router
