
fetch("http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={7e01bca3e079a8e1df46ffa00656b2a3}")
    .then(response => response.json())
    .then(data => {
        
        console.log(data);

    })

fetch("https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={7e01bca3e079a8e1df46ffa00656b2a3}")
    .then(response => response.json())
    .then(data => {
        
        console.log(data);

    })