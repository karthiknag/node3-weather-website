const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { errorMonitor } = require('stream')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Karthik'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About robot',
        name: 'Karthik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Looking for help??? Will come soon!!!',
        title: 'Help',
        name: 'Karthik'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address query string should be provided!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: 'Page Not Found',
        name: 'Karthik',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: '404: Page not found',
        name: 'Karthik',
        errorMessage: 'Page you are looking for is not on this server!'
    })
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})