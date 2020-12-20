$(() => {
    // Add endpoint config to search & load local key.json file
    let key;
    fetch("../src/config.json")
        .then(response => response.json())
        .then(data => {
            console.log("Config succesfully loaded");
            $(".search").data("config", data.weatherapi);
            // Load local key.json file
            $.getJSON("../key.json", (data) => {
                if (data) {
                    console.log("Key succesfully loaded");
                    key = data.key;
                    // Initialize app with dummy data
                    getWeatherData(data.key, "Brussel");
                    // Ask for geolocation usage
                    askGeolocationPermission(data.key);
                }
            })
            .fail(() => {
                console.log("Something went wrong during loading of key");
            });
        })
        .catch(err => console.log("Config failed to load: " + err));

    // Focus input field
    $("#input-location").trigger("focus");
    // Disable search button upon load
    $("#btn-search-location").attr("disabled", true);    

    // EVENT LISTENERS
    // Suggestions
    $("#input-location").on("keyup", (event) => {
        let location = $(event.target).val();
        // Enable search button
        if (location.length !== 0){
            $("#btn-search-location")
                .attr("disabled", false)
                .removeClass("btn-outline-dark")
                .addClass("btn-dark");
        }
        else{
            $("#btn-search-location")
                .attr("disabled", true)
                .removeClass("btn-dark")
                .addClass("btn-outline-dark");
        }
        if (event.key !== "Enter" && location.length >= 2){ // don't trigger if Enter pressed
            let location = $("#input-location").val();
            showSuggestions(key, location);
        }
    });
    // Search button
    $("#btn-search-location").on("click", () => {
        let location = $("#input-location").val();
        if (location.trim() == "" || !isNaN(parseInt(location))) {
            $(".modal-body").text("Gelieve een locatie in te geven.");
            $("#modal").modal("show");
        }
        else {
            let city = location.split(",")[0];  // split needed to cope with autocomplete functionality
            getWeatherData(key, city);
            window.setTimeout(handleTimeout, 120000, key, city); // refresh weather data every 2 minutes
        }
    });
});

const handleTimeout = (key, city) => {
    getWeatherData(key, city);
    window.setTimeout(handleTimeout, 120000, key, city);
};

const askGeolocationPermission = (key) => {
    navigator.geolocation.getCurrentPosition((data) => {
        const coordinates = `${data.coords.latitude},${data.coords.longitude}`;
        // perform search with coordinates as query
        getWeatherData(key, coordinates);

    }, (error) => {
        console.log(error.message);
    });
};

const getWeatherData = (key, query) => {
    const config = $(".search").data("config");
    const endpoint = config.baserequesturl + config.forecastendpoint + "?key=" + key + "&days=3&lang=nl&q=" + query; // free plan has max 3 days
    $.ajax({
        url: endpoint,
        success: (data, textStatus, jqXHR) => {
            $("#citybadge").text(data.location.name.charAt(0).toUpperCase() + data.location.name.slice(1));
            $("#forecast").data("weatherdata", data);
            setCards(data);
            setDetailedInformation(data);
        },
        error: (jqXHR, textStatus, errorThrown ) => {
            console.log("AJAX request failed: " + textStatus);
            $(".modal-body").text("Locatie niet gevonden. Probeer opnieuw");
            $("#modal").modal("show");
        }
    });
};

const setCards = (data) => {
    //const data = $("#forecast").data("weatherdata");  // unnecessary call
    for (i = 0 ; i <= 3 ; i++){
        let cardId = "#card-day-" + i;
        let card = $(cardId).children();
        if (i === 0){
            cardMethods.setCardImage(card, data.current.condition.icon);
            cardMethods.setCardHeader(card, "Nu");
            cardMethods.setCardSubheader(card, "laatste update om " + data.current.last_updated.split(" ")[1]);
            cardMethods.setCardTitle(card, data.current.condition.text);
            cardMethods.setCardText(card, data.current.temp_c);
            cardMethods.setWindKph(card, data.current.wind_kph);
            cardMethods.setWindDir(card, data.current.wind_dir);
        }
        else{
            cardMethods.setCardImage(card, data.forecast.forecastday[i-1].day.condition.icon);
            if(i === 1) cardMethods.setCardHeader(card, "Vandaag");
            else cardMethods.setCardHeader(card, helpers.getWeekdayFromDate(data.forecast.forecastday[i-1].date));
            cardMethods.setCardTitle(card, data.forecast.forecastday[i-1].day.condition.text);
            cardMethods.setCardText(card, data.forecast.forecastday[i-1].day.avgtemp_c);
            cardMethods.setMinTemp(card, data.forecast.forecastday[i-1].day.mintemp_c);
            cardMethods.setMaxTemp(card, data.forecast.forecastday[i-1].day.maxtemp_c);
        }
    };
}

const setDetailedInformation = (data) => {
    //const data = $("#forecast").data("weatherdata");  // unnecessary call
    for (i = 0 ; i <= 3 ; i++) {
        let collapseId = "#detailed-information-" + (i + 1);
        let element = $(collapseId);
        detailMethods.setDate(element, helpers.getLocaleDate(data.forecast.forecastday[i].date));
        detailMethods.setHumidity(element, data.forecast.forecastday[i].day.avghumidity);
        detailMethods.setWindKph(element, data.forecast.forecastday[i].day.maxwind_kph);
        detailMethods.setRainChance(element, data.forecast.forecastday[i].day.daily_chance_of_rain);
        detailMethods.setUVIndex(element, data.forecast.forecastday[i].day.uv);
        detailMethods.setSunrise(element, data.forecast.forecastday[i].astro.sunrise);
        detailMethods.setSunset(element, data.forecast.forecastday[i].astro.sunset);
    };
};

const showSuggestions = (key, value) => {
    const config = $(".search").data("config");
    const endpoint = config.baserequesturl + config.searchendpoint + "?key=" + key + "&q=" + value;
    $("#input-location").autocomplete({
        minLength: 2,
        source: (request, response) => {
            $.ajax({
                url: endpoint,
                success: (data, textStatus, jqXHR) => {
                    const cities = data.map(item => item.name);
                    response(cities);
                },
                error: (jqXHR, textStatus, errorThrown ) => {
                    console.log("AJAX request failed: " + textStatus);
                }
            })
        }
    });
};

const cardMethods = {
    setCardImage : (card, source) => {
        card.find(".card-img-top").attr("src", "http:" + source);
    },
    setCardHeader : (card, header) => {
        card.eq(1).html(`<h4>${header}</h4>`);
    },
    setCardSubheader : (card, subheader) => {
        card.eq(1).append(`<p>(${subheader})</p>`);
    },
    setCardTitle : (card, title) => {
        card.find(".card-title").text(title);
    },
    setCardText : (card, text) => {
        card.find(".temp").text(" " + text + " °C").prepend(`<img src="src/icons/temperature.svg" alt="temperature icon">`);
    },
    setWindKph : (card, wind) => {
        card.find(".wind-kph").text(" " + wind + " km/u").prepend(`<img src="src/icons/wind.svg" alt="wind icon">`);
    },
    setWindDir : (card, dir) => {
        card.find(".wind-dir").text(" " + helpers.convertDirection(dir)).prepend(`<img src="src/icons/direction.svg" alt="direction icon">`);
    },
    setMinTemp : (card, temp) => {
        card.find(".min-temp").text(temp + " °C");
    },
    setMaxTemp : (card, temp) => {
        card.find(".max-temp").text(temp + " °C");
    },
}

const detailMethods = {
    setDate : (item, value) => {
        item.find(".card-header").text(value);
    },
    setHumidity : (item, value) => {
        item.find(".humidity").text(value + "%");
    },
    setWindKph : (item, value) => {
        item.find(".wind-kph").text(value + " km/u");
    },
    setRainChance: (item, value) => {
        item.find(".rain-chance").text(value + "%");
    },
    setUVIndex : (item, value) => {
        item.find(".uv-index").text(value);
    },
    setSunrise : (item, value) => {
        item.find(".sunrise").text(helpers.convertAMPMto24(value));
    },
    setSunset : (item, value) => {
        item.find(".sunset").text(helpers.convertAMPMto24(value));
    },
}

const helpers = {
    getWeekdayFromDate : (date) => {
        const days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
        let day = date.split("-");
        return days[new Date(day[0], day[1] - 1, day[2]).getDay()];
    },
    getLocaleDate : (date) => {
        let numbers = date.split("-");
        let day = new Date(numbers[0], numbers[1] - 1, numbers[2]);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };    // format options
        return day.toLocaleDateString('nl-NL', options);
    },
    convertDirection : (direction) => direction.replace(/S|E/g, x => x === "S" ? "Z" : "O"),
    convertAMPMto24 : (value) => {
        const [time, modifier] = value.split(" ");
        let [hours, minutes] = time.split(":");
        if (hours === 12 && modifier === 'PM') hours = "00";
        if (modifier === "PM") hours = parseInt(hours, 10) + 12;
        return `${hours}:${minutes}`;
    }
};