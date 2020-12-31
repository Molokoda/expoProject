import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

async function reg(log, pas){
    let arrayOfData = await AsyncStorage.getItem('users');
    if(arrayOfData && log && pas){
        arrayOfData = JSON.parse(arrayOfData);
        let user = arrayOfData.find( element => element.log === log);
        if(user){
            alert('User with such login already exist');
        }
        else{
            arrayOfData.push({log, pas});
            await AsyncStorage.setItem('users', JSON.stringify(arrayOfData));
        }
    }
    else if(log && pas){
        
        await AsyncStorage.setItem('users', JSON.stringify([{log, pas}]));
    }
}

function RegistrationForm(props){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    return(
      <View style = {styles.container}>
        <Text style = {styles.textStyle} >Enter your login</Text>
        <TextInput  style = {styles.textInputStyle} onChange = {(e) => setLogin(e.target.value)}></TextInput>
        <Text style = {styles.textStyle} >Enter your password</Text>
        <TextInput style = {styles.textInputStyle} onChange = {(e) => setPassword(e.target.value)}></TextInput>
        <Button title = 'registration' onPress = {() =>  reg(login, password)}></Button>
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


export default RegistrationForm;