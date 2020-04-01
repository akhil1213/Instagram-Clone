import React, { Component } from 'react'
import { TextInput,Modal,Dimensions, Text, TouchableOpacity,FlatList, View, StyleSheet,  ScrollView, Image, Button } from 'react-native'
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
      iconImage:'',
      images: [

      ],
      comments:[],
      screenWidth:Dimensions.get('window').width,
      screenHeight:Dimensions.get('window').height,
      liked:false,
      heartIcon:require('./assets/like.png'),
      commentPath:require('./assets/comment.png'),
      modalVisible:false
   }
   comment = () => {
      this.setState({modalVisible:true})
   }
   changeLike = () =>{
      let liked = !this.state.liked
      let heartIcon = liked ? require('./assets/like.png') : require('./assets/dislike.png')
      console.log(this.state.liked)
      this.setState({liked,heartIcon})
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   pickImage = async (rowId) => {//if id was passed, then that row should be updated with the new result.uri
      
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1
      });
      console.log(rowId)
      var newPicture = {
         id:uuid.v1(),
         name:'akhil',
         path:result.uri
      }
      if(!result.cancelled){
         if(rowId == 'iconimage'){
            this.setState({iconImage:result.uri})
            console.log("icon image clicked")
         }else{
            if(rowId!=null){
               var index = -1;
               for(var i = 0; i < this.state.images.length; i++){
                  if(this.state.images[i].id == rowId){
                     index = i
                  }
               }
               console.log(index)
               let imagesCopied = [...this.state.images];  
               imagesCopied[index].path = result.uri
               this.setState({images:imagesCopied})
            }else{
               this.setState({ images: [...this.state.images, newPicture] }) 
            }
         }
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
            <Button title = "choose photo" onPress = {() => this.pickImage(null)} style = {styles.button}/>
            <ScrollView>
            <FlatList
               data={this.state.images}
               renderItem={({ item }) => {
               return(
                  <Swipeout autoClose={true} right={[
                     {
                        onPress: () =>{
                           console.log(item.id)
                           // const index = this.state.indexOf(item.id);
                           // console.log(index)
                           // newimages = this.state.images.splice(index,1)
                           // console.log(newimages)
                           // this.setState({images:newNames})
                           //code to delete clicked image from array
                           this.setState({images: this.state.images.filter( (picture) => { 
                              return picture.id !== item.id
                           })});
                           console.log(this.state.images)
                        },
                        text:'delete',
                        type:'delete'
                     },
                     {
                        onPress: () =>{
                           this.pickImage(item.id)
                        },
                        text:'edit',
                        type:'secondary'
                     },
                  ]}>
                  <View style = {styles.aboveImage}>
                     <TouchableOpacity onPress = {() => this.pickImage('iconimage')}>
                        <Image source={{uri:this.state.iconImage}} style={styles.iconImage}></Image>
                     </TouchableOpacity>
                     <Text>younginwabeard</Text>
                  </View>
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => this.clickedImage(this.props,item.id)}>
                     {/* <Text style = {styles.text}>
                        Lebron
                     </Text> */}
                     <Image source = {{uri:item.path}} style = {{width: this.state.screenWidth, height: this.state.screenHeight/2}} />
                  </TouchableOpacity>
                  <View style={styles.imageOptions}>
                     <TouchableOpacity onPress = {this.changeLike}>
                        <Text>Wow</Text>
                        <Image source={this.state.heartIcon}></Image>
                     </TouchableOpacity>
                     <TouchableOpacity onPress = {this.comment}>
                        <Text></Text>
                        <Image source={this.state.commentPath}></Image>
                     </TouchableOpacity>
                  </View>
                  <View>
                     <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                           Alert.alert("Modal has been closed.");
                        }}
                     >
                        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={text => this.setState({commentText:text})}/>
                     </Modal>
                  </View>
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
   aboveImage:{
      flexDirection:'row',
      marginBottom:10,
      height:50,
      alignItems:'center'
   },
   iconImage:{
      borderRadius:20,
      width:50,
      height:50
   },
   imageOptions:{
      height:50
   },
   container: {
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   text: {
      color: '#4f603c'
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