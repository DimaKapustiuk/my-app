import { useSelector, shallowEqual } from "react-redux";
import { IWeather } from "../../shared/interfaces";

export const SelectActiveDetailsCity = (): IWeather =>  useSelector((state: any) => state.weatherReducer.activeDetailsCity, shallowEqual)
export const SelectWeatherReducer = () => useSelector((state: any) => state.weatherReducer, shallowEqual);