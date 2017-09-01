const db = require('./db')
const pgp = require('pg-promise')()

create = (username, email, password) => {
  return db.one(`
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING user_id`,
    [username, email, password])
    .catch((error) => {
      console.log("\nError in create query\n")
      throw error
    })
}

getByUsername = (username) => {
  return db.query(`
    SELECT * FROM users
    JOIN reviews USING(user_id)
    JOIN albums USING(album_id)
    WHERE users.username = $1`,
    [username])
    .catch((error) => {
      console.log("\nError in getByUsername query\n")
      throw error
    })
}

update = (username , email, password) => {
  return db.one(`
    UPDATE users
    SET (email, password) = ($2, $3)
    WHERE username = $1
    RETURNING *`,
    [username , email, password])
  .catch((error) => {
    console.log("\nError in update query\n")
    throw error
  })
}

module.exports = {
  create,
  getByUsername,
  update
}
