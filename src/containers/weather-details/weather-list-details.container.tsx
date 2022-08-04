import { Box, Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateWeatherByCityDetailsThunkCreater } from "../../redux/action-thunks/weather.action-thunks";
import { SelectWeatherReducer } from "../../redux/selectors/weather.selector";
import { IWeather } from "../../shared/interfaces";
import LoaderComponent from "../../shared/ui-material-components/loader/loader";
import WeatherIconsComponent from "../../shared/ui-material-components/weather-icons/weather-icons.component";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Container, Typography } from "@mui/material";
import { getWeatherDescription } from "../../shared/utility";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const iconWrapStyles = {
  media: {
    height: 200,
    width: 200
  },
  iconWrapStyles: {
    width: `100%`
  }
};

const useStyles = makeStyles({
  titleBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20
  },
  title: {
    fontWeight: 700,
    fontSize: '3rem'
  },
  titleDescription: {
    fontWeight: 500,
    fontSize: '2rem'
  },
  weatherBox: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  iconsWrap: {
    maxWidth: '25%'
  },
  categoryTitle: {
    fontSize: '1.5rem',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px'
  },
  container: {
    maxHeight: 'calc(100vh - 400px)', 
    overflow: 'auto',
    paddingTop: 20,
    paddingBottom: 20
  }
})

const WeatherDetailsContainer = () => {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const { cityName }: any = useParams();
  const {
    activeDetailsCity,
    isLoading,
    errorMessage,
  }: { activeDetailsCity: IWeather; isLoading: boolean; errorMessage: string } =
    SelectWeatherReducer();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderKeysFromObject = (ob: any) => {
    return (
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Object.keys(ob).map((key: string, index: number) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>{`${key}: ${ob[key]}`}</Item>
          </Grid>
        ))}
      </Grid>
    );
  };

  useEffect(() => {
    dispatch(updateWeatherByCityDetailsThunkCreater(cityName));
  }, [dispatch, cityName]);

  useEffect(() => {
    if (activeDetailsCity) {
      const weatherDescription = getWeatherDescription(
        activeDetailsCity?.weather
      );

      setDescription(weatherDescription);
    }
  }, [activeDetailsCity]);

  const detailsWeater = () => {
    return (
      <Container maxWidth="lg">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Container maxWidth="lg">
          {!errorMessage && activeDetailsCity && (
            <Box>
              <Box className={classes.weatherBox}>
                <Box className={classes.titleBox}>
                  <h1 className={classes.title}>
                    {activeDetailsCity.name}
                  </h1>
                  <h2 className={classes.titleDescription}>{description}</h2>
                </Box>
                <Box className={classes.iconsWrap} >
                  {activeDetailsCity.weather && (
                    <WeatherIconsComponent
                      size={4}
                      weather={activeDetailsCity.weather}
                      iconWrapStyles={iconWrapStyles}
                    />
                  )}
                </Box>
              </Box>
              <Container className={classes.container}>
                <Box>
                  <h3 className={classes.categoryTitle}>Temperature</h3>
                  {renderKeysFromObject(activeDetailsCity.main)}
                </Box>
                <Box>
                  <h3 className={classes.categoryTitle}>Wind</h3>
                  {renderKeysFromObject(activeDetailsCity.wind)}
                </Box>
                <Box>
                  <h3 className={classes.categoryTitle}>Clouds</h3>
                  {renderKeysFromObject(activeDetailsCity.clouds)}
                </Box>
              </Container>
            </Box>
          )}
          {errorMessage && !activeDetailsCity && (
            <div>{errorMessage.toUpperCase()}</div>
          )}
        </Container>
      </Container>
    );
  };

  return (
    <div>
      {isLoading && <LoaderComponent />}
      {!isLoading && detailsWeater()}
    </div>
  );
};

export default WeatherDetailsContainer;
