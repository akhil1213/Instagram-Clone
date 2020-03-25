import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,  ScrollView, Image } from 'react-native'
   
class List extends Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Akhil',
            path:require('/Users/akhilkhanna/Desktop/React-Native/imagesofme/selfie1.png'),
         },
         {
            id: 1,
            name: 'Susan',
            path:require('/Users/akhilkhanna/Desktop/React-Native/imagesofme/selfie2.png'),
         },
         {
            id: 2,
            name: 'Robert',
            path:require('/Users/akhilkhanna/Desktop/React-Native/imagesofme/selfie3.png'),
         },
         {
            id: 3,
            name: 'Ben',
            path:require('/Users/akhilkhanna/Desktop/React-Native/imagesofme/selfie4.png'),
         },
      ],
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   render() {
      return (
         <View>
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
                        <Image source = {item.path} style = {styles.image} />
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
   }
})