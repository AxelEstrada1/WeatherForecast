
var APIKey = "797106bd7ff7868d6a17dcd319491aae";
var q = "";
var currentDate = dayjs().format(' dddd, MMM DD YYYY || HH:mm:ss');

$("#currentDay").text(currentDate);

function getWeather(q) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&units=imperial&appid=" + APIKey;
    
    $.ajax({
        // weather information
        url: queryURL,
        method: "GET",
        error: (err => { 
            alert("Your city was not found. Check your spelling or enter a city code")
            return;
        })
    })
    .then(function (response) {
        console.log(response)
        $(".cityList").empty()
        $("#days").empty()
        getForecast(response.coord.lat, response.coord.lon)
        
        var image = $('<img class="imgsize">').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
    });  
}

function getForecast(lat , lon) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`
    
    $.ajax({
        // weather info
        url: queryURL,
        method: "GET",
        error: (err => { 
            alert("Your city was not found. Check your spelling or enter a city code")
            return;
        })
    })
    .then(function (response) {
        console.log(response.list)
        $(".cityList").empty()
        $("#days").empty()
        
        for (let i = 0; i < response.list.length; i++) {
            const element = response.list[i];
            if (element.dt_txt.includes("12:00:00")) {
                let column = $("<div>")
                column.addClass("col g-3")
                let card = $("<div>")
                card.addClass("card my-3")
                let cardHeader = $("<div>")
                cardHeader.addClass("card-header").html(`<h5>${dayjs(element.dt_txt).format("ddd, MM DD")}</h5>`)
                let cardBody = $("<div>")
                cardBody.addClass("card-body").html(`<p> temp: ${element.main.temp}</p><p> humidity: ${element.main.humidity}</p><p> wind: ${element.wind.speed}</p>`)
                card.append(cardHeader).append(cardBody)
                column.append(card)
                $("#days").append(column)
                let image = $('<img class="imgsize">').attr('src', 'http://openweathermap.org/img/w/' + element.weather[0].icon + '.png');
            }
        }
    });
}

let storageHistory = JSON.parse(window.localStorage.getItem("history")) 
$("#search-button").on("click", function (event) {
    
    event.preventDefault();
    let serachinput = $("#city-input").val()
    getWeather(serachinput)
    let history = window.localStorage.getItem("history") ? JSON.parse(window.localStorage.getItem("history")) : []
    history.push(serachinput)
    console.log(history,serachinput)
    window.localStorage.setItem("history", JSON.stringify(history))
    
})

function displayHistory(){
    if (storageHistory && storageHistory.length){
        for (let i = 0; i < storageHistory.length; i++) {
            const element = storageHistory[i];
            let column = $("<li>")
            column.addClass("list-group-item historybutton").text(element)
            $("#historyList").removeClass("d-none").addClass("d-block").append(column)
        }
    }
}

displayHistory()