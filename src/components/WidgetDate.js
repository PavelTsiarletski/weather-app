import React, { useState, useEffect } from 'react';
import moment from 'moment';

const WidgetDate = (props) => {
  const { lastUpdateAt, setExpired, updateTime } = props;
  const [timePassed, setTimePassed] = useState('');
  let fromNow = !!lastUpdateAt ? moment(lastUpdateAt).fromNow() : null;
  useEffect(() => {
    const timer = setInterval(() => {
      setTimePassed(fromNow);
      if (moment(lastUpdateAt).add(updateTime, 'minutes').isSameOrBefore()) {
        setExpired(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  });
  return (
    <span>
      Обновлено:
      <br />
      {timePassed}
    </span>
  );
};

export default WidgetDate;
