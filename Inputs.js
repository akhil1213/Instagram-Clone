import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");
//Signup page
class Inputs extends Component {
   constructor(props){
      super(props)
      db.transaction( (tx) => {
         tx.executeSql(
           "create table if not exists user (username text primary key not null, password text not null);"
         );
         // tx.executeSql("delete from posts");
         // tx.executeSql("delete from comments");

      });
   }
   state = {
      username: '',
      password: ''
   }
   handleEmail = (text) => {
      // console.log(text)
      this.setState({ username: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   login(){
      
      db.transaction( (tx) => {
         tx.executeSql("insert into user (username,password) values (?, ?)", [this.state.username,this.state.password]);
      });
      this.props.navigation.navigate('lists',{username:this.state.username})
   }
   render() {
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Username"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}
               secureTextEntry={true}
            />
            <TouchableOpacity
               style = {styles.submitButton}
               onPress={this.login.bind(this)}>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 10,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white',
      textAlign: 'center',
   }
})