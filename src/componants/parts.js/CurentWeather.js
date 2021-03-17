import { useState, useEffect } from "react";
import Loader from "./Loader";
import Clear from "../images/Clear.jpg";
import Clouds from "../images/Clouds.jpg";
import Drizzle from "../images/Drizzle.jpg";
import Rain from "../images/Rain.jpg";
import Snow from "../images/Snow.jpg";
import Thunderstorm from "../images/Thunderstorm.jpg";
import Newchart from "./Newchart";

const small = (num) => {
  return num.toFixed(0);
};
const readable = (stamp) => {
  const dateObject = new Date(stamp * 1000);
  const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
  const Day = dateObject.toLocaleString("en-US", { weekday: "long" }); // Monday
  const Month = dateObject.toLocaleString("en-US", { month: "long" }); // December
  const DayNum = dateObject.toLocaleString("en-US", { day: "numeric" }); // 9
  const Year = dateObject.toLocaleString("en-US", { year: "numeric" }); // 2019
  const Hour = dateObject.toLocaleString("en-US", { hour: "numeric" }); // 10 AM
  const Minute = dateObject.toLocaleString("en-US", { minute: "numeric" }); // 30
  const Second = dateObject.toLocaleString("en-US", { second: "numeric" }); // 15
  const TimeZone = dateObject.toLocaleString("en-US", {
    timeZoneName: "short",
  }); // 12/9/2019, 10:30:15 AM CST
  return {
    Day,
    Month,
    DayNum,
    Year,
    Hour,
    Minute,
    Second,
    TimeZone,
    FullHour: `${Hour}:${Minute}`,
    humanDateFormat,
  };
};

const CurentWeather = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [position, setPosition] = useState({ lat: 0, lon: 0 });
  const [bg, setBg] = useState(Clear);
  const [error, setError] = useState({
    error: false,
    msgs: [],
  });
  const fetchWeather = async (lat, lon) => {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const result = await data.json();
      setData(result);
      switch (result.weather[0].main) {
        case "Thunderstorm":
          setBg(Thunderstorm);
          break;
        case "Drizzle":
          setBg(Drizzle);
          break;
        case "Rain":
          setBg(Rain);
          break;
        case "Snow":
          setBg(Snow);
          break;
        case Clear:
          setBg(Clear);
          break;
        case Clouds:
          setBg(Clouds);
          break;
        default:
          setBg(Clear);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    setPosition(crd);
    fetchWeather(crd.latitude, crd.longitude);
  }
  function locationError(err) {
    setError({
      ...error,
      error: true,
      msgs: [err.message],
    });
    console.log(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, locationError, options);
    setLoading(false);
  }, []); //data.dt

  console.log(data);
  if (error.error) {
    return (
      <div className="Current" style={{ background: `url(${Clear})` }}>
        <div className="main">
          <div className="holder">
            <h3 className="error">
              No location was fond , please allow it and refresh the page .
            </h3>
          </div>
        </div>
      </div>
    );
  }
  if (!Object.keys(data).length) {
    return (
      <div className="Current" style={{ background: `url(${Clear})` }}>
        <div className="main">
          <div className="holder">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Current" style={{ background: `url(${bg})` }}>
      <div className="main">
        <div className="holder">
          <div className="header">
            <h1>{small(data.main.temp - 273.15)} °c</h1>
            <div className="icon">
              <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="weather icon "
              />
              <span className="desc">{data.weather[0].description}</span>
            </div>
          </div>
          <h1 className="country" title={data.name}>
            {data.name}
          </h1>
          <h5 className="date"> {`${readable(data.dt).humanDateFormat}`}</h5>
        </div>
      </div>
      <div className="details">
        <div className="upper">
          <h1>Detail</h1>
          <ul>
            <li>
              <span> Clouds</span> {data.clouds.all}%
            </li>
            <li>
              <span> Humidity</span> {data.main.humidity}%
            </li>
            <li>
              <span> Winds</span> {small(data.wind.speed * 3.6)}km/h
            </li>
            <li>
              <span> Pressure</span> {data.main.pressure}hPa
            </li>
          </ul>
        </div>
        <div className="lower">
          <h1>Tempurature of the Day</h1>
          <Newchart position={position} />
        </div>
      </div>
    </div>
  );
};

export default CurentWeather;
