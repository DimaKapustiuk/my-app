import { IWeather, IWeatherMain, IweatherWeather } from "../../shared/interfaces/city-wheater.interface"
import { ADD_WEATHER_BY_CITY, DELETE_CITY_BY_ID, ISLOADING, SET_WEATHER_LIST, UPDATE_WEATHER_BY_CITY, UPDATE_WEATHER_BY_CITY_DETAILS, WEATHER_ERROR_MESSAGE } from "../types"

export const SetWeatherListAction = (weatherList: any): { type: string, weatherList: any[] } => {
  return {
    type: SET_WEATHER_LIST,
    weatherList
  }
}


export const UpdateWeatherByCityAction = ({ cityName, id, weather, main }: { cityName: string, id: any, weather: IweatherWeather, main: IWeatherMain }): { type: string, data: { cityName: string, id: any, weather: IweatherWeather, main: IWeatherMain }} => {
  return {
    type: UPDATE_WEATHER_BY_CITY,
    data: {
      cityName,
      id,
      weather,
      main
    }
  }
}

export const UpdateWeatherByCityDetailsAction = (activeDetailsCity: IWeather): { type: string, activeDetailsCity: IWeather }  => {
  return {
    type: UPDATE_WEATHER_BY_CITY_DETAILS,
    activeDetailsCity
  }
}

export const AddWeatherByCityAction = (data: IWeather): { type: string, data: IWeather } => {
  return {
    type: ADD_WEATHER_BY_CITY,
    data
  }
}

export const WeatherErrorMessageAction = (errorMessage: string) => {
  return {
    type: WEATHER_ERROR_MESSAGE,
    errorMessage
  }
}

export const IsLoadingAction = (isLoading: boolean) => {
  return {
    type: ISLOADING,
    isLoading
  }
}

export const DeleteWeatherCityById = (id: number) => {
  return {
    type: DELETE_CITY_BY_ID,
    id
  }
}

