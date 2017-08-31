const db = require('./db').db
const pgp = require('pg-promise')()

create = (name, username, email, password) => {
  return db.one(`
    INSERT INTO users (name, username, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id`,
    [name, username, email, password])
    .catch((error) => {
      console.log("\nError in create query\n")
      throw error
    })
}

getByUsername = (username) => {
  return db.query(`
    SELECT * FROM users
    LEFT OUTER JOIN posts USING(user_id)
    WHERE users.username = $1`,
    [username])
    .catch((error) => {
      console.log("\nError in getByUsername query\n")
      throw error
    })
}

update = (username , name, current_city) => {
  return db.one(`
    UPDATE users
    SET (name, current_city) = ($2, $3)
    WHERE username = $1
    RETURNING *`,
    [username , name, current_city])
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
