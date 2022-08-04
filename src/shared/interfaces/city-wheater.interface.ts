export interface IWeather {
  main: IWeatherMain;
  weather: IweatherWeather[];
  time: number;
  name: string;
  id: string;
  wind: {
    speed: number,
    deg: number
  };
  clouds: {
    all: number
  }

}

export interface IWeatherCityCoord {
  lon: number, 
  lat: number
}

export interface IWeatherMain {
  humidity: number;
  pressure: number;
  temp: number
  temp_max: number
  temp_min: number
}

export interface IweatherWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}
