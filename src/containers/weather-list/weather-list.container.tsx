import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LIST_CITIES } from "../../APIs/api-constant";
import { SelectWeatherReducer } from "../../redux/selectors/weather.selector";
import { IWeather } from "../../shared/interfaces/city-wheater.interface";
import { CardComponent } from "../../shared/ui-material-components/card/card.componets";
import {
  addWeatherByCityThunkCreater,
  createWeatherListThunkCreater,
  setWeatherListThunkCreater,
  updateWeatherByCityThunkCreater,
} from "../../redux/action-thunks/weather.action-thunks";
import "./weather-list.container.scss";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { parseJSON } from "../../shared/utility";
import {
  DeleteWeatherCityById,
  WeatherErrorMessageAction,
} from "../../redux/actions/weather-list.actions";
import LoaderComponent from "../../shared/ui-material-components/loader/loader";

const useStyle = makeStyles({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 25
  },
});

const WeatherListContainer = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { weatherList, errorMessage, isLoading } = SelectWeatherReducer();
  const searchTextLocal: string = parseJSON("searchText") || "";
  const [searchText, setSearchText] = useState(searchTextLocal);
  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    const localWeatherList = parseJSON("weatherList");

    if (!localWeatherList?.length) {
      dispatch(createWeatherListThunkCreater(LIST_CITIES));
    } else {
      dispatch(setWeatherListThunkCreater(localWeatherList));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("searchText", searchText);
    dispatch(WeatherErrorMessageAction(null!));
  }, [searchText, dispatch]);

  useEffect(() => {
    localStorage.setItem("weatherList", JSON.stringify(weatherList));
  }, [weatherList]);

  const updateWeather = (name: string) => {
    dispatch(updateWeatherByCityThunkCreater(name));
  };

  const addWeatherCity = () => {
    dispatch(addWeatherByCityThunkCreater(searchText));
  };

  const deleteCard = (id: number) => {
    dispatch(DeleteWeatherCityById(id));
  };

  const searchCityByText = (e: any) => {
    e.preventDefault();
    const { target } = e;
    setSearchText(target.value);
    setDisabledBtn(!target.value);
  };

  const getWeatherListBySearch = (
    weatherList: IWeather[],
    searchText: string
  ) => {
    return weatherList.filter((weather: IWeather) =>
      weather.name
        .toUpperCase()
        .trim()
        .includes(searchText.toUpperCase().trim())
    );
  };

  return (
    <div className={classes.flexContainer}>
      <div className={classes.inputWrap}>
        <TextField
          id="outlined-basic"
          label="Please enter the city"
          variant="outlined"
          value={searchText}
          onChange={searchCityByText}
        />
        <Button variant="contained" color="primary" disabled={disabledBtn} onClick={addWeatherCity}>
          Add Weather City
        </Button>
      </div>
      {isLoading && <LoaderComponent />}
      <div className="weather-list-container">
        {!!getWeatherListBySearch(weatherList, searchText).length ? (
          getWeatherListBySearch(weatherList, searchText).map(
            (weather: IWeather) => (
              <CardComponent
                key={weather.id}
                weather={weather}
                updateWeather={updateWeather}
                deleteCard={deleteCard}
              />
            )
          )
        ) : (
          <div>
            {errorMessage ? (
              <div>{errorMessage}</div>
            ) : (
              <div>
                Please click button "Add Weather City" for Add City in the list.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherListContainer;
