const db = require('./db')
const pgp = require('pg-promise')()

getAll = () => {
  return db.query(`SELECT * FROM albums`, [])
    .catch( (error) => {
      console.log("\nError in getAll query\n")
      throw error
    })
}

getRecentReviews = () => {
  return db.query(`
    SELECT * FROM reviews
    JOIN albums USING(album_id)
    JOIN users USING(user_id)
    ORDER BY review_id DESC
    LIMIT 3`,
    [])
    .catch( (error) => {
      console.log("\nError in getAll query\n")
      throw error
    })
}

getByTitle = (title) => {
  return db.query(`
    SELECT * FROM albums
    FULL OUTER JOIN reviews USING(album_id)
    FULL OUTER JOIN users USING(user_id)
    WHERE albums.title = $1`,
    [title])
    .catch( (error) => {
      console.log("\nError in getByTitle query\n")
      throw error
    })
}

module.exports = {
  getAll,
  getRecentReviews,
  getByTitle
}
