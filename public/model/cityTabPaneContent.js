const ICON_URL = 'http://openweathermap.org/img/wn/';

/**
 *The tap-pane(<div>) belonging to a City has Content displaying the data belonging to a city
 *  fetched from the open weather api (City fetchData()) and divided upon three card elements(<div>)
 */
function tabPaneContentTemplate(city){
    console.log(city);
    const data = city.data;
    //let name = capitalizeIFirstLetter(city.name.split(',')[0]);
    let name = data['name'];
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
                    <div class="card one"> 
                    <div class="card-body">
                        <div class="row">
                            <div class="col-9 card-one">
                                <div class="card-one-content"></div>
                                <p class=" city-country-title">${name} | ${country} <img src="https://www.countryflags.io/${country}/flat/24.png" alt="country-flag"></p>
                                <h6 class="timeStamp">as of ${timeStamp}</h6>
                                <p class="temperature">${currentTemp}°</p>
                                <p class="weatherMain">${weatherMain}</p>
                            </div>
                            <div class="col-3 card-one card-one-right">
                                <div class="card-one-content">
                                    <img class="weatherIcon" style="background: url(${icon});">
                                    <p class="weatherDesc">${weatherDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="card two">
                        <div class="card-body row">
                            <div class="col">
                                <p class="card-two-title">Clouds</p>
                                <p class="percentage">${cloudiness}%</p>
                                <div class="meter">
                                    <span style="width: ${cloudiness}%"></span>
                                </div>
                            </div>
                            <div class="col">
                                <p class="card-two-title">Humidity</p>
                                <p class="percentage">${humidity}%</p>
                                <div class="meter">
                                    <span style="width: ${humidity}%"></span>
                                </div>
                            </div>
                            <div class="col">
                                <p class="card-two-title">Wind</p>
                                <p class="percentage">${windSpeed}m/s</p>
                                <div class="windSpeed"></div>
                            </div>
                        </div>
                    </div>
                    <div class="card three">
                        <div class="card-body">
                            <div class="row">
                                <div class="col card-three">
                                    <img class="sunImage" src="../images/sunrise.png">
                                </div>
                                <div class="col card-three">
                                    <p class="sunTime morning">${sunrise}</p>
                                </div>
                                <div class="col card-three">
                                    <img  class="sunImage"  src="../images/sunset.png">
                                </div>
                                <div class="col card-three">
                                    <p class="sunTime evening">${sunset}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            `;
}

