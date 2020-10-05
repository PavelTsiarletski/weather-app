import { getRequest } from "./api-requests";

const apiKey = "0624d4c9984e6e55dedf7d234918788f";

class Api {
  getWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru&units=metric`;
    return getRequest(url);
  }
}
export default new Api();
