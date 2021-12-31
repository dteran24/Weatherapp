import React from 'react';
import './App.css';
import myIcons from './logos';

const api = {
  key: "347b44f2d585ef8da2676748a01fc5c0",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const deg = "\u00B0";
  const [query, setQuery] = React.useState('');
  const [weather, setWeather] = React.useState({});
 
  const search = evt =>{
    if(evt.key === "Enter" ){
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      });
    }
  }

const ICONS_WEATHER = {
  Rain: <myIcons.Rain className="shadow" height = '110px' width= '110px' fill ="white"/>,
  Clouds: <myIcons.Cloudy className="shasdow" height = '110px' width= '110px' fill="white"/>,
  Thunderstorm: <myIcons.Thunderstorm className="shadow" height = '110px' width= '110px' fill ="white"/>,
  Snow: <myIcons.Snow className="shadow" height = '110px' width= '110px' fill ="white"/>,
  Drizzle: <myIcons.Drizzle className="shadow" height = '110px' width= '110px' fill ="white"/>,
  Fog: <myIcons.Fog className="shadow" height = '110px' width= '110px' fill ="white"/>,
  Haze: <myIcons.Haze className="shadow" height = '110px' width= '110px' fill ="white"/>,
  Mist: <myIcons.Mist className="shadow" height = '110px' width= '110px'fill ="white"/>,
  Clear:<myIcons.Clear className="shadow" height = '110px' width= '110px'fill ="white"/>
}

const time = new Date();
const currentTime = time.getHours();


  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May","June", "July", "August","September", "October","November", "December"];
    let days = ["Monday", "Tuesday","Wednesday","Thursday","Friday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`
  }

  return (
    <div className={currentTime > 9 && currentTime < 18 ?  'day' : 'night' }>
      <main>
        <div className="search-box">
          <input
            type = "text"
            className="search-bar"
            placeholder="Enter City.."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
      <div className='box1'>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className = "weather-box">
          <div className="temp">{Math.round(weather.main.temp)}{deg}F</div>
          <div className="weather">{weather.weather[0].main}</div>
          <div className='logo'>
          {ICONS_WEATHER[weather.weather[0].main]}
          </div>
        </div>
      </div>
      ) : ('')}
      {weather.cod === "404" ?(
        <p className='error'>City not found.</p>
      ) : (<></>)}
      </main>
    </div>
  );
}





export default App;
