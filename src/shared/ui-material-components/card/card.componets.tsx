import { Box, Button, Card, CardActionArea, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { IWeather } from "../../interfaces/city-wheater.interface";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import moment from 'moment';
import ConfirmDialogComponent from "../confirm-dialog/confirm-dialog.component";
import { useNavigate  } from "react-router-dom";
import WeatherIconsComponent from "../weather-icons/weather-icons.component";
import { getWeatherDescription } from "../../utility";

const flexContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 265
  },
  weatherInfoBox: {
    ...flexContainer,
    padding: 20
  },
  weatherTitleBox: {
    ...flexContainer,
    marginTop: 20
  },
  tempInfo: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  cardActions: {
    ...flexContainer,
    cursor: 'pointer'
  }
});


export const CardComponent = ({ weather: cityWheather, updateWeather, deleteCard }: { weather: IWeather, updateWeather: Function, deleteCard: Function }) => {
  const classes = useStyles();
  const { weather, main, time, name, id } = cityWheather;
  const [ description, setDescription ] = useState('');
  const [ dateTime, setDateTime ] = useState('');
  const [ isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const configDialog = {
    title: 'Delete this City?',
    text: 'Do you realy want Delete City?',
  };

  useEffect(() => {
    const weatherDescription = getWeatherDescription(weather);

    setDescription(weatherDescription);
  }, [weather]);

  useEffect(() => {
    const dateTime = moment(time).format('HH:mm:ss');
    setDateTime(dateTime);
  }, [time]);
  
 

  const openDeleteDialog = () => {
    setIsOpenDeleteDialog(true);
  }

  const handleActionDialog = (isConfirm: boolean) => {
    if (isConfirm) {
      deleteCard(id);
    }
    setIsOpenDeleteDialog(false);
  }

  return (
    <Card id={`${id}`} className={classes.root}>
      <CardActionArea onClick={() => navigate(`${name}`)}>
        <Box className={classes.weatherInfoBox}>
          <WeatherIconsComponent size={2} weather={weather} />
          <Box>
            <Typography className={classes.tempInfo} component="p">
              Temp: { Math.floor(main.temp) }
            </Typography>
            <Typography className="" component="p">
              Humidity: { Math.floor(main.humidity) }
            </Typography>
          </Box>
        </Box>
        
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="h4">
            {
              description
            }
          </Typography>
          <Box className={classes.weatherTitleBox}>
            <Typography gutterBottom variant="h5" component="h2">
              { name }
            </Typography>
            <Typography gutterBottom component="p">
              { dateTime }
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => updateWeather(name)}>
          Update Weather
        </Button>
        <DeleteForeverIcon onClick={openDeleteDialog} />
        <ConfirmDialogComponent isOpen={isOpenDeleteDialog} handleActionDialog={handleActionDialog}  configDialog={configDialog} />
      </CardActions>
    </Card>
  )
}