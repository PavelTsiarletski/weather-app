import React from 'react';
import { ExtremumWidgetBody, ExtremumWeather } from '../common/Components';

const ExtremumWidget = (props) => {
  const { data, tempUnit } = props;
  return (
    <>
      {!!data[0] ? (
        <ExtremumWidgetBody>
          <ExtremumWeather>
            <p>
              <strong>Самый холодный город из списка: </strong>
            </p>
            <p>{data[0].name + ' ' + data[0].temp.current[tempUnit]}</p>
          </ExtremumWeather>
          <ExtremumWeather>
            <p>
              <strong>Самый горячий город из списка: </strong>
            </p>
            <p>{data[1].name + ' ' + data[1].temp.current[tempUnit]}</p>
          </ExtremumWeather>
        </ExtremumWidgetBody>
      ) : (
        <p>Добавьте города для просмотра</p>
      )}
    </>
  );
};

export default ExtremumWidget;
