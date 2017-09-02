const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const session = require('express-session')
const Simple = require('connect-pg-simple')(session)

const port = process.env.PORT || 3000

app.set( 'view engine', 'ejs' )
app.set( 'views', __dirname + '/views' )

app.use( express.static('public') )
app.use( bodyParser.urlencoded({ extended: false }) )

const sessionOptions = {
  store: new Simple({
  conString: 'postgres://localhost:5432/vinyl'
}),
  name: 'session',
  secret: 'hush hush',
  cookie: { maxAge: 1000 * 60 * 5 * 1 },
  resave: false,
  saveUninitialized: false,
}

app.use( session(sessionOptions) )

app.use('/', require('./routes') )

app.use( (req, res) => res.status(404).render('not_found') )

app.listen( port, () => console.log(`Listening on http://localhost:${port}...`) )
