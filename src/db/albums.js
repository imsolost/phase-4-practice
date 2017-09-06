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
    WHERE albums.title = $1
    ORDER BY review_id DESC`,
    [title])
    .catch( (error) => {
      console.log("\nError in getByTitle query\n")
      throw error
    })
}

createReview = (user_id, album_id, content) => {
  return db.none(`
    INSERT INTO reviews (user_id, album_id, content)
    VALUES ($1, $2, $3)`,
    [user_id, album_id, content])
    .catch((error) => {
      console.log("\nError in posts.create query\n")
      throw error
    })
}

deleteReview = (review_id) => {
  return db.none(`
    DELETE FROM reviews
    WHERE review_id = $1`,
    [review_id])
    .catch((error) => {
      console.log("\nError in posts.create query\n")
      throw error
    })
}

getReviewById = (review_id) => {
  return db.one(`
    SELECT * FROM reviews
    FULL OUTER JOIN users USING(user_id)
    WHERE review_id = $1`,
    [review_id])
    .catch((error) => {
      console.log("\nError in posts.create query\n")
      throw error
    })
}

const search = (searchQuery) => {
  return db.query(`
    SELECT
      *
    FROM
      albums
    WHERE
      lower(title || ' ' || artist) LIKE $1::text
    `,
    [`%${searchQuery.toLowerCase().replace(/\s+/,'%')}%`])
    .catch(error => error);
}

module.exports = {
  getAll,
  getRecentReviews,
  getByTitle,
  createReview,
  deleteReview,
  getReviewById,
  search
}
