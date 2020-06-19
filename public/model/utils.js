/**
 * defines the length/ amount of characters of the uuid
 * @type {number}
 */
const ID_LENGTH = 37;

/**
 * creates an unique uuid of length @ID_LENGTH, always starting with character 'a'
 * @returns {string}
 */
function uuidv4() {
    return 'a' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * converts a number representing the temperature in kelvin to celcius as pure integer
 * @param temp in kelvin
 * @returns {number} in celcius
 */
function kelvinToCelsius(temp) {
    return Math.trunc(temp - 273.15);
}

/**
 * converts given unix timestamp to human readable time in format HH:MM:SS
 * @param time
 * @returns {string}
 */
function unixTimeConverter(time) {
    let unixTimestamp = time
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unixTimestamp * 1000);
// Hours part from the timestamp
    let hours = date.getHours();
// Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

}