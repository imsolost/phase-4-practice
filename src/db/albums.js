const db = require('./db')
const pgp = require('pg-promise')()

getByTitle = (title) => {
  return db.query(`
    SELECT * FROM albums
    JOIN reviews USING(album_id)
    JOIN users USING(user_id)
    WHERE albums.title = $1`,
    [title])
    .catch((error) => {
      console.log("\nError in getByTitle query\n")
      throw error
    })
}

module.exports = {
  getByTitle
}
