const ICON_URL = 'http://openweathermap.org/img/wn/';

function tabContentTemplate(tab){
    const data = tab.data;
    let country = data['sys']['country']; // country code e.g. 'GB' for england
    let timeStamp = unixTimeConverter(data['dt']); // unix time converted to human-readable time
    let weatherMain = data['weather'][0]['main']; // string
    let weatherDescription = data['weather'][0]['description']; // string
    let icon = ICON_URL + data['weather'][0]['icon'] + '@2x.png'; // url
    let currentTemp = kelvinToCelsius(data['main']['temp']); // temperature converted to Celsius
    let humidity = data['main']['humidity']; // in %
    let cloudiness = data['clouds']['all']; // in %
    let windSpeed = data['wind']['speed'] // in meter/sec
    let sunrise = unixTimeConverter(data['sys']['sunrise']); // unix time converted to human-readable time
    let sunset = unixTimeConverter(data['sys']['sunset']); // unix time converted to human-readable time
    return `
                    <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <p class="card-text">${tab.city} | ${country}</p>
                                <h6 class="card-subtitle text-muted">as of ${timeStamp}</h6>
                                <h2 class="card-title">${currentTemp}°</h2>
                                <h4 class="card-subtitle text-muted">${weatherMain}</h4>
                            </div>
                            <div class="col">
                                <img class="weatherIcon" style="background: url(${icon});">
                                <p class="card-text">${weatherDescription}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="card">
                        <div class="card-body row">
                            <div class="col">
                                <h2 class="card-two-title">Cloudiness</h2>
                                <p class="card-text">${cloudiness}%</p>
                                <div class="card-two-icon" id="cloudIcon"></div>
                            </div>
                            <div class="col">
                                <h2 class="card-two-title">Humidity</h2>
                                <p class="card-text">${humidity}%</p>
                                <div class="card-two-icon" id="humidityIcon"></div>
                            </div>
                            <div class="col">
                                <h2 class="card-two-title">Windspeed</h2>
                                <p class="card-text">${windSpeed}m/s</p>
                                <div class="card-two-icon" id="windIcon"></div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <img class="sunImage" src="../images/sunrise.png">
                                </div>
                                <div class="col sunTime">
                                    <p class="card-text">${sunrise}</p>
                                </div>
                                <div class="col">
                                    <img  class="sunImage"  src="../images/sunset.png">
                                </div>
                                <div class="col sunTime">
                                    <p class="card-text">${sunset}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            `;
}

function tabMenuTemplate(tab){
    if (document.getElementsByClassName('nav-item').length === 0) {
        return `
                        <a class="nav-link active" id="${tab.id}-tab" data-toggle="tab" role="tab" aria-controls="${tab.id}" aria-selected="true">
                            ${tab.city}
                            <button type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </a>`
    } else {
        return `
                        <a class="nav-link" id="${tab.id}-tab" data-toggle="tab" role="tab" aria-controls="${tab.id}" aria-selected="true">
                            ${tab.city}
                            <button type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </a>`
    }
}