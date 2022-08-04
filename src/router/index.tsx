import { Navigate } from "react-router-dom";
import GridContainer from "../containers/grid.container/grid.container";
import WeatherDetailsContainer from "../containers/weather-details/weather-list-details.container";
import WeatherListContainer from "../containers/weather-list/weather-list.container";
import ErrorComponent from "../shared/ui-material-components/error/error.component";

const routes = [
  { path: '/', element: <Navigate to="/weather-list" />},
  { path: '/grid', element: <GridContainer />, exact: true },
  { path: '/weather-list', element: <WeatherListContainer />, exact: true },
  { path: '/weather-list/:cityName', element: <WeatherDetailsContainer />, exact: true },
  { path: '/error', element: <ErrorComponent /> }
];

export default routes;