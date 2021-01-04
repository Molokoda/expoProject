import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import schema from '../scheme/registrationScheme'

async function loginUser(log, pas, setShow){
  let validate = await schema.validate({login: log, password: pas});
  if(validate.error){
    alert(validate.error);
  }
  else{
    let arrayOfData = await AsyncStorage.getItem('users');
    if(arrayOfData && log && pas){
      arrayOfData = JSON.parse(arrayOfData);
      let user = arrayOfData.find( element => element.log === log && element.pas === pas);
      if(user){
        await AsyncStorage.setItem('isLogin', JSON.stringify(true));
        setShow('welcomePage'); 
      }
      else{
          alert('Login or password is not correct');
      }
    }
  }
}

function LoginForm(props){
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  return(
    <View style = {styles.container}>
      <Text style = {styles.textStyle} >Enter your login</Text>
      <TextInput  style = {styles.textInputStyle} onChange = {(e) => setLogin(e.target.value)}></TextInput>
      <Text style = {styles.textStyle} >Enter your password</Text>
      <TextInput style = {styles.textInputStyle} onChange = {(e) => setPassword(e.target.value)}></TextInput>
      <Button title = 'login' onPress = {() =>  loginUser(login, password, props.setShow)}></Button>
      <Button title = 'back' onPress = {() =>  props.setShow('start')}></Button>
    </View>
  )
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


export default LoginForm;