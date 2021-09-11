const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup hbs engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Samuel Eskilson"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Underrail is a very good game!',
        name: 'Stygian Studios'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help!',
        helpText: 'you need help?',
        name: 'Samuel Eskilson'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'ERROR 404',
        errorMessage: 'Help article not found!',
        name: 'meesa sith lord!'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: 'ERROR 404',
        errorMessage: 'Page not found!',
        name: 'MYYYY NAAAAMMME!! ISSS!! GYOUBU MASTAKA ONIWA!!!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
