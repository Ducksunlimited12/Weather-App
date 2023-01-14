const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "efc3fddb379c5b29ac6dc5213bd13bc6";
const currentTime = new Date().getHours();

if (document.body) {
    if (7 <= currentTime && currentTime < 20) {
        document.body.background = "img/day.png";
    }
    else {
        document.body.background = "img/night.png";
    }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial`;

 



  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather, wind, visibility } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        <h5> Feels Like: ${Math.round(main.feels_like)}°F</h5>
        <h5> Humidity: ${Math.round(main.humidity)}%</h5>
        <h5> Pressure: ${main.pressure} hPa</h5>
        <h5> Wind: ${wind.speed}km/h</h5>
        <h5> Visibility: ${visibility/1000}km</h5>
        <button type="button" id="delete-btn" onclick="return this.parentNode.remove()"/>X</button>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please enter a valid city";
    });

  

  msg.textContent = "";
  form.reset();
  input.focus();
});

