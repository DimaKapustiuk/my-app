import { getWeatherByCityName } from "../../APIs/api-services/wheather-api.service";
import { IWeather } from "../../shared/interfaces/city-wheater.interface";
import { AddWeatherByCityAction, IsLoadingAction, SetWeatherListAction, UpdateWeatherByCityAction, UpdateWeatherByCityDetailsAction, WeatherErrorMessageAction } from "../actions/weather-list.actions";

export const getWeatherByCityNameResult = (cityName: string, dispatch: any, action: any) => {
  dispatch(IsLoadingAction(true));
  return getWeatherByCityName(cityName)
    .then(({ data }) => dispatch(action({ cityName, ...data })))
    .catch(e => dispatch(WeatherErrorMessageAction(e.response.data.message)))
    .finally(() => dispatch(IsLoadingAction(false)))
}

export const updateWeatherByCityThunkCreater = (cityName: string): any => {
  return async (dispatch: any) => {
    await getWeatherByCityNameResult(
      cityName, 
      dispatch, 
      UpdateWeatherByCityAction
    );
  }
}

export const updateWeatherByCityDetailsThunkCreater = (cityName: string): any => {
  return async (dispatch: any) => {
    await getWeatherByCityNameResult(
      cityName, 
      dispatch, 
      UpdateWeatherByCityDetailsAction
    );
  }
}

export const addWeatherByCityThunkCreater = (cityName: string): any => {
  return async (dispatch: any) => {
    await getWeatherByCityNameResult(
      cityName, 
      dispatch, 
      AddWeatherByCityAction
    );
  }
}

export const setWeatherListThunkCreater = (weatherList: IWeather[]): any => {
  return async (dispatch: any) => {
    dispatch(SetWeatherListAction(weatherList));
  }
}

export const createWeatherListThunkCreater = (citiesList: string[]): any => {
  return async (dispatch: any) => {
    const weatherList = citiesList.map(async (cityName: string) =>  {
      const responce = await getWeatherByCityName(cityName);
      return responce.data as IWeather;
    });
   
    Promise.all(weatherList)
      .then((r: IWeather[]) => dispatch(SetWeatherListAction(r)))
  }
}



