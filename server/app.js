const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const route = require('./routes/subsribe')
const keys = require('./config/keys')

const app = express()

mongoose.connect( keys.mongoURI )
    .then( () => console.log('MongoDB connected!') )
    .catch( error => console.log(error) )

app.use( bodyParser.urlencoded({extended: true}) )
app.use( bodyParser.json() )

app.use( '/api', route )

app.use(express.static('./client'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'index.html'))
})

module.exports = app