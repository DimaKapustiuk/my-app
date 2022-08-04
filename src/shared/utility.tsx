import { IweatherWeather } from "./interfaces";

export const parseJSON = (key: string): any => {
  const localData = localStorage.getItem(key);

  try {
    if (localData) {
      return JSON.parse(localData);
    }
  } catch {
    return false;
  }
}

export const getWeatherDescription = (weather: IweatherWeather[]) => {
  return weather
    .map((ob: IweatherWeather) => ob.description)
    .join(' and ')
    .toUpperCase();
}

export const getweatherImage = (icon: string, size: number): string => {
  return `http://openweathermap.org/img/wn/${icon}@${size}x.png`
}