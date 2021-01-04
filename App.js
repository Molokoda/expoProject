import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput  } from 'react-native';
import RegistrationForm from './registrationForm.js';
import LoginForm from './loginForm.js';
import AsyncStorage from '@react-native-community/async-storage';
import WeatherPage from './weatherPage.js'

export default function App() {
  const [show, setShow] = useState('start');
  let isLogin;
  AsyncStorage.getItem('isLogin').then(result => isLogin = JSON.parse(result));

  useEffect( () => {
    if(isLogin){
      setShow('welcomePage');
    } 
  })

  if(show === 'start'){
    return (
      <View style={styles.container}>
        <Button  title = 'Login' onPress = {() =>  setShow('login')}></Button>
        <Button title = 'Registration' onPress = {() =>  setShow('registration')}>Registration</Button>
      </View>
    );
  }
  else if(show === 'login'){
    return(
      <LoginForm setShow = {setShow}/>
    )
  }
  else if(show === 'registration'){
    return(
      <RegistrationForm setShow = {setShow}/>
    )
  }
  else if(show === 'welcomePage'){
    return(
      <WeatherPage setShow = {setShow}/>
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
