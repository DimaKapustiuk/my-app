import axios from "axios";
import { API_KEY, WEATHER_URL } from "../api-constant";

export const getWeatherByCityName = (cityName: string) => {
  return axios.get(`${WEATHER_URL}`, {
    params: {
      q: cityName,
      appid: API_KEY,
      units: "metric",
    },
  });
};


