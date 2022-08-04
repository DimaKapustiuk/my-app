import { combineReducers } from "redux";
import { gridReducer } from "./reducers/grid.reducer";
import { weatherReducer } from "./reducers/weather.reducer";

export const rootReducer = combineReducers({
  gridReducer,
  weatherReducer
});