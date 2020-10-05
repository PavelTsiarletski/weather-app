import React, { useState, useEffect } from 'react';
import Api from '../base/app-api';
import { WidgetBody, WidgetActions, NorthArrow } from '../common/Components';
import moment from 'moment';
import WidgetDate from './WidgetDate';
import arrow from '../assets/arrow.png';

const Widget = (props) => {
  const {
    tempUnit,
    speedUnit,
    removeCity,
    city,
    updateTime,
    setCityListChanged,
  } = props;

  // Initial config
  const initialData = {
    name: 'N/A',
    weatherDescription: 'N/A',
    temp: {
      current: {
        celsius: null,
        fahrenheit: null,
      },
      feelsLike: {
        celsius: null,
        fahrenheit: null,
      },
    },
    humidity: null,
    pressure: null,
    wind: {
      speed: {
        miles: null,
        kilometers: null,
        meters: null,
      },
      direction: {
        name: null,
        deg: null,
      },
    },
    lastUpdateAt: null,
    icon: null,
  };

  // State
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);

  const resToData = (res) => {
    let doneData;
    doneData = {
      ...data,
      name: res.name,
      weatherDescription: res.weather[0].description,
      temp: {
        current: setTempArr(res.main.temp),
        feelsLike: setTempArr(res.main.feels_like),
      },
      humidity: res.main.humidity,
      pressure: res.main.pressure,
      wind: {
        speed: setWindSpeedArr(res.wind.speed),
        direction: setWindDirection(res.wind.deg),
      },
      lastUpdateAt: moment().format(),
      icon: res.weather[0].icon,
    };
    return doneData;
  };

  const savedCity = localStorage.getItem([city]);

  useEffect(() => {
    if (props.city && (!savedCity || expired)) {
      setLoading(true);
      Api.getWeather(props.city)
        .then((res) => {
          setData(resToData(res));
          setLoading(false);
          setExpired(false);
          localStorage.setItem([city], JSON.stringify(resToData(res)));
          setCityListChanged(true);
        })
        .catch((err) => {
          alert('Неверно введен город или api key пришел в негодность');
          removeCity(city);
          setLoading(false);
        });
    } else if (savedCity !== data) {
      setData(JSON.parse(savedCity));
    }
  }, [expired]);

  const setWindDirection = (direction) => {
    let directions = {};
    if (direction === 360 || direction === 0) {
      directions = {
        name: 'Северный',
      };
    } else if (direction < 90) {
      directions = {
        name: 'Северо-восточный',
      };
    } else if (direction === 90) {
      directions = {
        name: 'Восточный',
      };
    } else if (direction < 180) {
      directions = {
        name: 'Юго-восточный',
      };
    } else if (direction === 180) {
      directions = {
        name: 'Южный',
      };
    } else if (direction < 270) {
      directions = {
        name: 'Юго-западный',
      };
    } else if (direction === 270) {
      directions = {
        name: 'Западный',
      };
    } else if (direction < 360) {
      directions = {
        name: 'Северо-западный',
      };
    }
    directions = { ...directions, deg: direction };
    return directions;
  };

  const setTempArr = (temp) => {
    let celsius = `${Math.round(temp)}°C`;
    let fahrenheit = `${Math.round(temp * 1.8 + 32)}°F`;
    return {
      celsius: celsius,
      fahrenheit: fahrenheit,
    };
  };

  const setWindSpeedArr = (speed) => {
    let miles = `${Math.round(speed * 2.237)} миль/ч`;
    let kilometers = `${Math.round(speed * 3.6)} км/ч`;
    let meters = `${Math.round(speed)} м/с`;
    return {
      miles: miles,
      kilometers: kilometers,
      meters: meters,
    };
  };

  const handleRemove = () => {
    removeCity(city);
  };

  return (
    <WidgetBody>
      {loading ? (
        'loading...'
      ) : (
        <>
          <div>
            <div>
              <img
                src={`http://openweathermap.org/img/w/${data.icon}.png`}
                alt="weatherIcon"
              />
            </div>
            <div>
              <h2>
                {data.name} {data.temp.current[tempUnit]}
              </h2>
              <p>
                Ощущается как <strong>{data.temp.feelsLike[tempUnit]}</strong>
              </p>
              <p>{data.weatherDescription}</p>
            </div>
          </div>
          <div>
            <p>
              <strong>Ветер:</strong> {data.wind.speed[speedUnit]},{' '}
              {data.wind.direction.name}
            </p>
            <p>
              <strong>Атмосферное давление:</strong> {data.pressure} гПа
            </p>
            <p>
              <strong>Влажность воздуха:</strong> {data.humidity}%
            </p>
            <NorthArrow
              direction={data.wind.direction.deg}
              src={arrow}
              alt="arrow"
            />
          </div>
          <WidgetActions>
            <button onClick={handleRemove}>Remove</button>
            <WidgetDate
              lastUpdateAt={data.lastUpdateAt}
              setExpired={setExpired}
              updateTime={updateTime.split(' ')[0]}
            />
          </WidgetActions>
        </>
      )}
    </WidgetBody>
  );
};

export default Widget;
