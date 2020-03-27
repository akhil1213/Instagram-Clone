import React, { Component } from 'react'
import { Text, TouchableOpacity,FlatList, View, StyleSheet,  ScrollView, Image, Button } from 'react-native'
// import ImagePicker from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Swipeable from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout'
// import {GestureHandler} from 'expo';
// const { Swipeable } = GestureHandler;
// import {
//    TouchableNativeFeedback,
//    TouchableHighlight,
//    TouchableOpacity,
//    TouchableWithoutFeedback
//   } from 'react-native-gesture-handler'


class List extends Component {
   state = {
      names: [

      ],
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1
      });
   
      console.log(result);
      var newPicture = {
         id:uuid.v1(),
         name:'akhil',
         path:result.uri
      }
      if(!result.cancelled){
         this.setState({ names: [...this.state.names, newPicture] }) 
      }
   }
   onSwipeLeft(gestureState) {
      console.log('you swiped left')
   }
   // RightActions = (progress,dragX) => {
   //    const scale = dragX.interpolate({
   //       inputRange:[-100,0],
   //       outputRange:[1,0],
   //       extrapolate:'clamp'
   //    });
   //    return (
   //       <View style = {styles.LeftAction}>
   //          <Text style = {styles.deleteText}>Delete</Text>
   //       </View>
   //    );
   // }

   // }
   clickedImage = (props,id) =>{
      this.props.navigation.navigate('swiping')
      console.log(id)
   }
   render() {
      const swipeProps = {
         autoClose:true,
         onClose:(sectionID, rowId, direction)=>{
            console.log('closed')
         },
         onOpen:(sectionID, rowId, direction)=>{
            console.log(rowId)
         },
         // rowId:this.props.index,
      }
      return (
         <View>
            <Button title = "choose photo" onPress = {this.pickImage} style = {styles.button}/>
            <ScrollView>
            <FlatList
               data={this.state.names}
               renderItem={({ item }) => {
               return(
                  <Swipeout autoClose={true} right={[
                     {
                        onPress: () =>{
                           console.log(item.id)
                           // const index = this.state.indexOf(item.id);
                           // console.log(index)
                           // newNames = this.state.names.splice(index,1)
                           // console.log(newNames)
                           // this.setState({names:newNames})
                           this.setState({names: this.state.names.filter( (picture) => { 
                              return picture.id !== item.id
                           })});
                           console.log(this.state.names)
                        },
                        text:'delete',
                        type:'delete'
                     },
                     {
                        onPress: () =>{
                           console.log(item.id)
                        },
                        text:'edit',
                        type:'secondary'
                     },
                  ]}>
                     <TouchableOpacity
                        key = {item.id}
                        style = {styles.container}
                        onPress = {() => this.clickedImage(this.props,item.id)}>
                        <Text style = {styles.text}>
                           Lebron
                        </Text>
                        <Image source = {{uri:item.path}} style = {styles.image} />
                     </TouchableOpacity>
                  </Swipeout>
                  )
               }}
               keyExtractor={item => item.id}
            />   
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
   },
   LeftAction:{
      backgroundColor:'red',
      padding:30
   }
})