const express = require('express')
const bodyParser = require('body-parser')
// const database = require('./db/database')
const app = express()

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', require('./routes') )

app.use((request, response) => {
  response.status(404).render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
