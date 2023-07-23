import '../sass/style.scss';

const apiKey = '851b388ce49b453b5433b2284be66394';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__button');
const weatherImage = document.querySelector('.weather__icon');

//-------------------Get day of week and time----------------------
const newDate = new Date();

const weekDays = {
	0: 'Sunday',
	1: 'Monday',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
	6: 'Saturday',
};

let dayOfWeek = weekDays[newDate.getDay()];
let currentDay = newDate.getDate().toString();
let currentHour = newDate.getHours().toString();
let currentMinutes = newDate.getMinutes().toString();
let currentTime = `${currentHour} : ${currentMinutes}`;
console.log(currentTime);
//------------------async promise to get weather statistic----------------------
async function checkWeather(city) {
	try {
		const response = await fetch(`${apiUrl}q=${city}&appid=${apiKey}&units=metric`);
		const data = await response.json();

		document.querySelector('.weather__temp').innerHTML = Math.round(data.main.temp) + '°C';
		document.querySelector('.weather__city').innerHTML = data.name;
		document.querySelector('.data-time__day').innerHTML = dayOfWeek;
		document.querySelector('.data-time__date').innerHTML = currentDay;
		document.querySelector('.data-time__time').innerHTML = currentTime;
		document.querySelector('#metrePerSec').innerHTML = data.wind.speed + ' m/sec';
		document.querySelector('#humidity').innerHTML = data.main.humidity + ' %';
		document.querySelector('.weather').style.display = 'block';
		document.querySelector('.weather__description').innerHTML = data.weather[0].description;
		document.querySelector('#feels-like').innerHTML =
			'Feels like ' + Math.round(data.main.feels_like) + '°C';

		switch (data.weather[0].main) {
			case 'Clear':
				return (
					(weatherImage.src = '/images/clear.png'),
					(document.body.style.backgroundImage = "url('/favicon/clear.gif')")
				);
			case 'Clouds':
				return (
					(weatherImage.src = '/images/clouds.png'),
					(document.body.style.backgroundImage = "url('/favicon/clouds.gif')")
				);
			case 'Drizzle':
				return (
					(weatherImage.src = '/images/drizzle.png'),
					(document.body.style.backgroundImage = "url('/favicon/drizzle.gif')")
				);
			case 'Mist':
				return (
					(weatherImage.src = '/images/mist.png'),
					(document.body.style.backgroundImage = "url('/favicon/mist.gif')")
				);
			case 'Rain':
				return (
					(weatherImage.src = '/images/rain.png'),
					(document.body.style.backgroundImage = "url('/favicon/rain.gif')")
				);
			case 'Snow':
				return (
					(weatherImage.src = '/images/snow.png'),
					(document.body.style.backgroundImage = "url('/favicon/snow.gif')")
				);
		}
	} catch (error) {
		console.log(`Something went wrong: ${error}`);
		alert('The city name has been written wrong!');
	}
}

searchBtn.addEventListener('click', () => checkWeather(searchInput.value));
