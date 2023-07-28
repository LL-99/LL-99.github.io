var biomeData;
var weatherData;

//#region Preloading

/**
 * Loads all biomes from the respective .csv file and adds them to the biome selector
 * @param {*} selector The selector to which to add the biome entries
 */
function loadBiomes(selector) {
    console.log("Loading biomes!");
    var path = "/data/biome_data.csv";

    selector.innerHTML = '';

    fetch(path).then(response => response.text()).then(text => {
        var rawData = text;
        biomeData = ParseCSV(rawData, 3);

        for (var i = 0; i < biomeData.length; i++) {
            var newOpt = document.createElement('option');
            newOpt.value = biomeData[i][0];
            newOpt.innerHTML = biomeData[i][1];
            selector.append(newOpt);
        }

        console.log(biomeData);

        selector.value = 0;
        updateBiomeDescription(selector);
    });
}

/**
 * Loads all weather types from the respective .csv file and stores them for later use
 */
function loadWeather() {
    console.log("Loading weather!!");
    var path = "/data/weather_data.csv";

    fetch(path).then(response => response.text()).then(text => {
        var rawData = text;
        weatherData = ParseCSV(rawData, 7);
        console.log(weatherData);
    });
}

//#endregion

//#region Biome & Season selection

/**
 * Updates the biome description based on the selected dropdown value
 * @param {*} selector 
 */
function updateBiomeDescription(selector) {
    console.log("Selected biome " + selector.value);
    console.log(biomeData);

    var descr = document.getElementById('biome-descr');
    descr.innerText = biomeData[selector.value][2];
}

//#endregion

/**
 * Randomly chooses a valid weather type, based on the selected biome and its properties
 */
function generateWeather() {
    var biome = biomeData[document.getElementById('biome-select').value];

    var weather = [biome[0], biome[1], biome[2], 'A', 'B']



    // Create row entry
    var innerTable = document.getElementById('weather-table');
    var newRow = document.createElement('tr');

    var temperature = document.createElement('td');
    temperature.innerText = weather[0];
    newRow.append(temperature);

    var humidity = document.createElement('td');
    humidity.innerText = weather[1];
    newRow.append(humidity);

    var cloudiness = document.createElement('td');
    cloudiness.innerText = weather[2];
    newRow.append(cloudiness);

    var windspeed = document.createElement('td');
    windspeed.innerText = weather[3];
    newRow.append(windspeed);

    var description = document.createElement('td');
    description.innerText = weather[4];
    newRow.append(description);

    innerTable.prepend(newRow);

    // Update background
    //var centerHolder = document.getElementById('main-center');
    //centerHolder.style.height = Math.max(600, 200 + 100 * innerTable.childNodes.length) + "px";
}

// Init
$(document).ready(function () {
    loadBiomes(document.getElementById('biome-select'));
    loadWeather();
})
//updateBiomeDescription(document.getElementById("biome-select"));
//document.getElementById("biome-select").addEventListener('onChange',UpdateBiomeDescription(event));v