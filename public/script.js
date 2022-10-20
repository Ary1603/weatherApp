// Input that google search de location
const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',

        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude

        })
    }).then(res => res.json()).then(data => {
        setWeatherData(data, place.formatted_address)
        console.log(data)
    })
})

const bodyImage = document.querySelector('body')
const container = document.querySelector('.container')
const iconWeather = document.querySelector('.icon-weather')
const generalInformation = document.querySelector('.general-information')
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const humidityElement = document.querySelector('[data-humidity]')
const windElement = document.querySelector('[data-wind]')

function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.condition.text
    temperatureElement.textContent = data.condition.temperature + '  C°'
    humidityElement.textContent = data.atmosphere.humidity + '  g / m³'
    windElement.textContent = data.wind.speed + '  m/s'

    switch (data.condition.text) {
        case 'Cloudy':
            iconWeather.src = './img/moustly-cloudy.webp'
            iconWeather.style.width = '27vh'
            iconWeather.style.padding = '0'
            generalInformation.style.paddingTop = '1vh'
            bodyImage.style.backgroundImage = "url('./img/bgSunny.jpg')"
            break;

        case 'Mostly Sunny':
            iconWeather.src = './img/sunny.webp'
            bodyImage.style.backgroundImage = "url('./img/bgSunny.jpg')"
            break;

        case 'Partly Cloudy':
            iconWeather.src = './img/moustly-cloudy.webp'
            iconWeather.style.width = '27vh'
            iconWeather.style.padding = '0'
            generalInformation.style.paddingTop = '1vh'
            bodyImage.style.backgroundImage = "url('./img/bgSunny.jpg')"
            break;

        case 'Showers':
            iconWeather.src = './img/showers.webp'
            iconWeather.style.width = '30vh'
            iconWeather.style.padding = '0'
            generalInformation.style.paddingTop = '1vh'
            bodyImage.style.backgroundImage = "url('./img/bgShowers.jpg')"
            container.style.backgroundColor = "background-color: rgba(172, 181, 189, 0.807);"
            break;

        case 'Rain':
            iconWeather.src = './img/rain.webp'
            iconWeather.style.width = '30vh'
            iconWeather.style.padding = '0'
            generalInformation.style.paddingTop = '1vh'
            bodyImage.style.backgroundImage = "url('./img/bgRain.jpg')"
            container.style.backgroundColor = "background-color: rgba(172, 181, 189, 0.807);"
            break;


        case 'Mostly Clear':
            iconWeather.src = './img/sunny.webp'
            break;

        default:
            break;
    }
}