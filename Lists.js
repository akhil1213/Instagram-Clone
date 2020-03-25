import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,  ScrollView, Image, Button } from 'react-native'
// import ImagePicker from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker';

class List extends Component {
   state = {
      names: [

      ],
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   // handleChoosePhoto = () => {
      // ImagePicker.launchImageLibrary(options,response => {
      //    if(response.uri){
      //       this.setState(state => {
      //          newPicture = {
      //             path:response.uri,
      //             name:'whatev',
      //             id:5
      //          }
      //          const names = state.names.concat(state.value);
      //          return {
      //            names,
      //          };
      //        });
      //    }
      // })
      pickImage = async () => {
         let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.All,
           allowsEditing: true,
           aspect: [4, 3],
           quality: 1
         });
     
         console.log(result);
         var newPicture = {
            id:5,
            name:'akhil',
            path:result.uri
         }
         this.setState({ names: [...this.state.names, newPicture] }) 
       }

   // }
   render() {
      return (
         <View>
            <Button title = "choose photo" onPress = {this.pickImage} style = {styles.button}/>
            <ScrollView>   
               {
                  this.state.names.map((item, index) => (
                     <TouchableOpacity
                        key = {item.id}
                        style = {styles.container}
                        onPress = {() => this.props.navigation.navigate('swiping')}>
                        <Text style = {styles.text}>
                           {item.name}
                        </Text>
                        <Image source = {{uri:item.path}} style = {styles.image} />
                     </TouchableOpacity>
                  ))
               }
            </ScrollView>
         </View>
      )
   }
}
export default List

const styles = StyleSheet.create ({
   container: {
      padding: 20,
      marginTop: 40,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
      justifyContent: 'space-between',

   },
   text: {
      color: '#4f603c'
   },
   image:{
      width: 100, 
      height: 100
   },
   button:{
      padding:10,
      backgroundColor:'blue',
      top:0,
      right:0,
      position: 'absolute'
   }
})