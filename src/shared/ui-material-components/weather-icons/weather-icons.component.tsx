import { Box, CardMedia, makeStyles } from "@material-ui/core"
import { IweatherWeather } from "../../interfaces"
import { getweatherImage } from "../../utility";

const flexContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const useStyles = (styles?: { iconWrapStyles: any, media: any }) => {
  return makeStyles({
    media: {
      height: 50,
      width: 50
    },
    iconWrapStyles: {
      ...flexContainer,
      width: '25%',
      ...styles?.iconWrapStyles
    },
    ...styles
  })();
}

const WeatherIconsComponent = ({ size, weather, iconWrapStyles }: any) => {
  const classes = useStyles(iconWrapStyles);

  return (
    <Box className={classes.iconWrapStyles}>
      {
       weather && weather.map((weatherItem: IweatherWeather) => <CardMedia
          key={weatherItem.id}
          className={classes.media}
          image={getweatherImage(weatherItem.icon, size)}
          title={weatherItem.main}
        />)
      }
    </Box>
  )
}

export default WeatherIconsComponent;