import React, { useState, useEffect } from 'react';
import Autocomplete from 'react-google-autocomplete';
import Widget from './components/Widget';
import {
  Header,
  ContentBody,
  Content,
  SearchBar,
  HeaderContent,
} from './common/Components';
import './App.css';
import ExtremumWidget from './components/ExtremumWidget';

export default function App() {
  // Initial params
  let initialConfig = {
    speedUnit: !!localStorage.getItem('speedUnit')
      ? localStorage.getItem('speedUnit')
      : 'kilometers',
    tempUnit: !!localStorage.getItem('tempUnit')
      ? localStorage.getItem('tempUnit')
      : 'celsius',
    updateTime: !!localStorage.getItem('updateTime')
      ? localStorage.getItem('updateTime')
      : '1 min',
    savedCitiesList: !!localStorage.getItem('citiesList')
      ? JSON.parse(localStorage.getItem('citiesList'))
      : [],
  };

  const params = {
    windSpeed: [
      {
        name: 'км/ч',
        val: 'kilometers',
      },
      {
        name: 'м/с',
        val: 'meters',
      },
      {
        name: 'миль/ч',
        val: 'miles',
      },
    ],
    tempUnits: [
      {
        name: '°C',
        val: 'celsius',
      },
      {
        name: '°F',
        val: 'fahrenheit',
      },
    ],
    updateRate: [
      {
        val: 1,
        unit: 'min',
      },
      {
        val: 5,
        unit: 'min',
      },
      {
        val: 20,
        unit: 'min',
      },
    ],
  };

  // State
  const [value, setValue] = useState('');
  const [citiesList, setCitiesList] = useState(initialConfig.savedCitiesList);
  const [speedUnit, setSpeedUnit] = useState(initialConfig.speedUnit);
  const [tempUnit, setTempUnit] = useState(initialConfig.tempUnit);
  const [updateTime, setUpdateTime] = useState(initialConfig.updateTime);
  const [isCityListChanged, setCityListChanged] = useState(true);
  const [extremumData, setExtremumData] = useState([]);

  useEffect(() => {
    if (isCityListChanged) {
      setExtremumData(extremumValues());
      setCityListChanged(false);
    }
  }, [isCityListChanged]);

  const handleAddCity = (obj) => {
    let city = obj.address_components
      ? obj.address_components[0].long_name
      : obj.name;
    let filtered = citiesList.filter((e) => e === city);
    if (filtered.length === 0) {
      let newCitiesList = [...citiesList, city];
      setCitiesList(newCitiesList);
      localStorage.setItem('citiesList', JSON.stringify(newCitiesList));
    } else {
      alert('Этот город уже в списке');
    }
  };

  const extremumValues = () => {
    let citiesData = [];
    citiesList.map((city) =>
      citiesData.push(JSON.parse(localStorage.getItem(city)))
    );
    citiesData = citiesData.sort(
      (a, b) =>
        Math.floor(a.temp.current.celsius.split('°C')[0]) -
        Math.floor(b.temp.current.celsius.split('°C')[0])
    );
    citiesData = [citiesData[0], citiesData[citiesData.length - 1]];
    return citiesData;
  };

  const removeCity = (city) => {
    const filtered = citiesList.filter((e) => e !== city);
    setCitiesList(filtered);
    localStorage.setItem('citiesList', JSON.stringify(filtered));
    localStorage.removeItem([city]);
    setCityListChanged(true);
  };
  /* 
    ! I know that is not a good practice on the react, 
    but it's the fastest solution that I found in a short time :) 
*/
  const pacContainer = document.querySelector('.pac-container');
  if (pacContainer !== null && value.length < 3) {
    pacContainer.classList.add('hidden');
  } else if (pacContainer !== null) {
    pacContainer.classList.remove('hidden');
  }
  return (
    <div>
      <Header>
        <HeaderContent>
          <h2>Weather App</h2>
          <ExtremumWidget data={extremumData} tempUnit={tempUnit} />
        </HeaderContent>
      </Header>
      <ContentBody>
        <Content>
          <SearchBar>
            <Autocomplete
              style={{ width: '200px' }}
              onPlaceSelected={(place) => {
                handleAddCity(place);
                setValue(
                  !!place.address_components
                    ? place.address_components[0].long_name
                    : place.name
                );
              }}
              types={['(cities)']}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div>
              <select
                value={tempUnit}
                onChange={(e) => {
                  setTempUnit(e.target.value);
                  localStorage.setItem('tempUnit', e.target.value);
                }}
              >
                {params.tempUnits.map((e, index) => (
                  <option key={e.name + e.val + index} value={e.val}>
                    {e.name}
                  </option>
                ))}
              </select>
              <select
                value={speedUnit}
                onChange={(e) => {
                  setSpeedUnit(e.target.value);
                  localStorage.setItem('speedUnit', e.target.value);
                }}
              >
                {params.windSpeed.map((e, index) => (
                  <option key={e.name + e.val + index} value={e.val}>
                    {e.name}
                  </option>
                ))}
              </select>
              <select
                value={updateTime}
                onChange={(e) => {
                  setUpdateTime(e.target.value);
                  localStorage.setItem('updateTime', e.target.value);
                }}
              >
                {params.updateRate.map((e, index) => (
                  <option
                    key={e.unit + e.val + index}
                    value={e.val + ' ' + e.unit}
                  >
                    {e.val + ' ' + e.unit}
                  </option>
                ))}
              </select>
            </div>
          </SearchBar>
          {citiesList.map((e, index) => (
            <Widget
              city={e}
              key={e + index}
              tempUnit={tempUnit}
              speedUnit={speedUnit}
              removeCity={removeCity}
              updateTime={updateTime.split(' ')[0]}
              setCityListChanged={setCityListChanged}
            />
          ))}
        </Content>
      </ContentBody>
    </div>
  );
}
