import { useState } from 'react';
import './App.css';

const api = {key : '101bc2e3475864316b09ddef39be58d9', base: 'https://api.openweathermap.org/data/2.5/'}

function App() {
  const [city,setCity] = useState('')
  const [weather,setWeather] = useState({})

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setCity('');
       // console.log(result);//

      });
    }
  }

  const dateBuilder = (d) =>{
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursdat','Friday','Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app-warm': 'app'):'app'}>
      <main>
        <div className='search-box'>
          <input type='text' className='search-bar' placeholder='Search...'
           onChange={e =>setCity(e.target.value)} value={city} 
           onKeyPress={search}/> 
        </div>
    {(typeof weather.main != 'undefined') ? (
     <div>
       <div className='location-box'>
          <div className='location'>{weather.name},{weather.sys.country}</div>
          <div className='date'>{dateBuilder(new Date())}</div> 
       </div>
       <div className='weather-box'>
          <div className='temp'>
            {Math.round(weather.main.temp)}°c
          </div>
          <div className='weather'>{weather.weather[0].main}</div>
       </div>
       <div className='bottom'>
        <div className='feels'>
         <p className='bold'>{weather.main.feels_like}°F</p>
         <p>Feels Like</p>
        </div>
        <div className='humidity'>
         <p className='bold'>{weather.main.humidity}%</p>
         <p>Humidity</p>
        </div>
         <div className='wind'>
           <p className='bold'>{weather.wind.speed}MPH</p>
           <p>Wind Speed</p>
         </div>
       </div>
     </div>
    ) : ('')}
      </main>

    </div>
  );
}

export default App;
