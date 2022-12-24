// console.log("Client side js file is loaded")

// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// getting weather data using fetch


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector("#message-1")
const message2 = document.querySelector("#message-2")


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    message1.textContent = "Loading..." //while searching the location
    message2.textContent = ""   // erasing the previous weather data
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                message1.textContent = data.error   // setting error msg if any
            }
            else {
                // console.log(data.address+" "+data.forecastData)
                message1.textContent = "Entered address is " + data.address // setting location if no error
                message2.textContent = data.forecastData    // setting the forecast
            }
        })
    })
})