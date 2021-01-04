import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';

function WeatherPage(props){
    const [weatherForecast, setWeatherForecast] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [day, setDay] = useState(0);
    const [city, setCity] = useState('');
    useEffect(() => {
      if(!city){
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
  
          let location = await Location.getCurrentPositionAsync({});
          setCity(location);
        })();
      }
      
      if(city && isLoading){
        const host = `http://api.weatherapi.com/v1/forecast.json?key=668de3030ed24d8c9f833153202911&q=${city['coords'].latitude},${city['coords'].longitude}&days=3`;
        fetch(host).then(result => result.json()).then(result => {
            setWeatherForecast(result);
            setIsLoading(false);
        } );
      }
    })

    if(isLoading){        
      return(
        <View style = {styles.container}>  
          <Text>Is loading...</Text>
        </View>
      )
    }
    else{
      return(
        <View style = {styles.container}>
          <Text>Welcome</Text>
          <Button title = 'today' onPress = {() => setDay(0)}></Button>
          <Button title = 'tomorrow' onPress = {() => setDay(1)}></Button>
          <Button title = 'day after tommorow' onPress = {() => setDay(2)}></Button>
          <View>
            <Text>Tempreture: {weatherForecast.forecast.forecastday[day].hour[12].temp_c}°С</Text>
            <Text>FeelsLike: {weatherForecast.forecast.forecastday[day].hour[12].feelslike_c}°С</Text>
            <Text>Chance of rain: {weatherForecast.forecast.forecastday[day].hour[12].chance_of_rain}</Text>
            <Text>Chance of snow: {weatherForecast.forecast.forecastday[day].hour[12].chance_of_snow}</Text>
            <Text>Cloud: {weatherForecast.forecast.forecastday[day].hour[12].cloud}</Text>
          </View>
          <Button title = 'logOut' onPress = {async() =>  
            {
              await AsyncStorage.setItem('isLogin', JSON.stringify(false));
              props.setShow('start');
            }
            }>
          </Button>
        </View>
        )
  } 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    textStyle:{
      color: 'black'
    },
  
    textInputStyle:{
      height: 30, 
      borderColor: 'gray', 
      borderWidth: 1,
      width: 200,
      marginBottom: 10
    },
  });

  export default WeatherPage;