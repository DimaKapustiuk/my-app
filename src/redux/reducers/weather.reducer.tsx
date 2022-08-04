import { IWeather } from "../../shared/interfaces/city-wheater.interface";
import { ADD_WEATHER_BY_CITY, DELETE_CITY_BY_ID, ISLOADING, SET_WEATHER_LIST, UPDATE_WEATHER_BY_CITY, UPDATE_WEATHER_BY_CITY_DETAILS, WEATHER_ERROR_MESSAGE } from "../types";

const intialState = {
  weatherList: [],
  isLoading: false,
  errorMessage: null,
  activeDetailsCity: null
};

export const weatherReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case UPDATE_WEATHER_BY_CITY_DETAILS: {
      return {
        ...state,
        activeDetailsCity: action.activeDetailsCity
      }
    }

    case WEATHER_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: action.errorMessage
      }
    }
    case ISLOADING: {
      return {
        ...state,
        isLoading: action.isLoading
      }
    }
    case SET_WEATHER_LIST: {
      return {
        ...state,
        weatherList: action.weatherList,
        activeDetailsCity: null,
        errorMessage: null
      };
    }

    case UPDATE_WEATHER_BY_CITY: {
      return {
        ...state, 
        errorMessage: null,
        weatherList: state.weatherList.map((weather: IWeather) => {
          if (weather.id === action.data.id) {
            return {
              ...weather,
              weather: [...action.data.weather ],
              main: { ...action.data.main },
              time: Date.now()
            };
          }
          return weather;
        })
      }
    }

    case ADD_WEATHER_BY_CITY: {
      const includes = state.weatherList.some((ob: IWeather) => ob.name.toUpperCase().trim() === action.data.name.toUpperCase().trim());

      return {
        ...state,
        weatherList: includes ? [ ...state.weatherList ] : [ action.data, ...state.weatherList ],
        errorMessage: null
      };
    }

    case DELETE_CITY_BY_ID: {
      return {
       ...state, 
       weatherList: state.weatherList.filter((weather: IWeather) => weather.id !== action.id)
      }
    }

    default: {
      return state;
    }
  }
};
