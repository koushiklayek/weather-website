const express = require("express")
const path = require("path")
const hbs = require("hbs")
const app = express()
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const port=process.env.PORT || 3000

// define paths for express config
const publisDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publisDirPath))

app.get("", (req, res) => {
    // res.send("<h1>Weather</h1>")
    res.render('index', {
        title: "Weather App",
        name: "Koushik"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text",
        title: "Help",
        name: "Koushik"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Koushik"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                latitude,
                longitude,
                address: req.query.address,
                forecastData
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found",
        name: "Koushik"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found",
        name: "Koushik"
    })
})

app.listen(port, () => {
    console.log("Server is up and running")
})