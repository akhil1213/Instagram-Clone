import React, { Component } from 'react'
import { TextInput,Modal,Dimensions, Text, TouchableOpacity,FlatList, View, StyleSheet,  ScrollView, Image, Button } from 'react-native'
// import ImagePicker from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Swipeable, { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout'
import {connect} from 'react-redux'
import Comment from './Comment'
// import Realm from './databases/schemas'

// import {GestureHandler} from 'expo';
// const { Swipeable } = GestureHandler;
// import {
//    TouchableNativeFeedback,
//    TouchableHighlight,
//    TouchableOpacity,
//    TouchableWithoutFeedback
//   } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

class Photos extends Component {
   _isMounted = false;
   constructor(props) {
      super(props);
      this.reloadData();
      this.params = this.props.route.params//to get username from inputs component
   }
   state = {
      iconImage:'',
      images: [

      ],
      screenWidth:Dimensions.get('window').width,
      screenHeight:Dimensions.get('window').height,
      liked:false,
      heartIcon:require('./assets/like.png'),
      commentPath:require('./assets/comment.png'),
      modalVisible:false,
      commentText:'',
      // username:this.params.username
   }
   reloadData = () => {
      db.transaction( (tx) => {
         // tx.executeSql("DROP TABLE posts;")
         // tx.executeSql("DROP TABLE comments;")
         // tx.executeSql("DROP TABLE likedphotos;")
         tx.executeSql(
           "create table if not exists posts (id text primary key not null,username text, path text, liked int);"
         );
         tx.executeSql(
           "create table if not exists comments (id text primary key not null, commentText text, pictureId text, liked int, username text);"
         );
         tx.executeSql(
            "create table if not exists likedphotos (username text, path text);"
          );
         console.log(this.params.username)
         tx.executeSql("select * from posts", [], (_, { rows }) =>{
            this.setState({images:rows._array})
         });
         // console.log("@@@@liked photos:")
         tx.executeSql("select * from likedphotos", [], (_, { rows }) =>{
            // this.setState({images:rows._array})
         });
         tx.executeSql("select * from likedphotos where username = ?", [this.params.username], (_, { rows }) =>{
            // console.log(rows._array);
            likedPhotos = rows._array
            imagesCopied = this.state.images;
            for(var i =0; i < imagesCopied.length;i++){
               for(var j = 0; j < likedPhotos.length; j++){
                  if(imagesCopied[i].username == likedPhotos[j].username && imagesCopied[i].path == likedPhotos[j].path){
                     imagesCopied[i].liked=1
                  }
               }
            }
            this.setState({images:imagesCopied})
         });
      });
   }
   changeLike = (item) =>{
      let liked = !this.state.liked
      let heartIcon = liked ? require('./assets/dislike.png') : require('./assets/like.png')
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
         path:result.uri,
         username:this.params.username,
         liked:0
      }
      if(!result.cancelled){
         if(rowId == 'iconimage'){
            this.setState({iconImage:result.uri})
         }else{
            if(rowId!=null){
               var index = -1;
               for(var i = 0; i < this.state.images.length; i++){
                  if(this.state.images[i].id == rowId){
                     index = i
                  }
               }
               let imagesCopied = [...this.state.images];  
               imagesCopied[index].path = result.uri
               this.setState({images:imagesCopied})
            }else{
               this.setState({ images: [...this.state.images, newPicture] }) 
               db.transaction(
                  tx => {
                    tx.executeSql("insert into posts (id,path,username,liked) values (?, ?,?,?)", [newPicture.id,newPicture.path,this.params.username,0]);
                    tx.executeSql("select * from posts", [], (_, { rows }) =>{
                     console.log(rows._array);
                  });
                  },
                  null,
                  null
                );
            }
         }
      }
   }
   onSwipeLeft(gestureState) {
      console.log('you swiped left')
   }
   clickedImage = (props,id) =>{
      this.props.navigation.navigate('swiping')
   }
   render() {
      return (
         <View>
            <Button title = "choose photo" onPress = {() => this.pickImage(null)} style = {styles.button}/>
            <FlatList
               data={this.state.images}
               renderItem={({ item }) => {
                  console.log({item})
               return(
                  <View style={{backgroundColor:'black'}}>
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
                        <Text>{item.username}</Text>
                     </View>
                     <TouchableOpacity
                        key = {item.id}
                        style = {styles.container}
                        onPress = {() => this.clickedImage(this.props,item.id)}>
                        <Image source = {{uri:item.path}} style = {{width: this.state.screenWidth, height: this.state.screenHeight/2}} />
                     </TouchableOpacity>
                     <View style={styles.imageOptions}>
                        <TouchableOpacity onPress = {()=>{
                           let liked = !this.state.liked
                           let heartIcon = liked ? require('./assets/dislike.png') : require('./assets/like.png')
                           this.setState({liked,heartIcon})
                           if(liked == 1){
                              db.transaction(
                                    tx => {
                                    tx.executeSql("insert into likedphotos (username,path) values (?, ?)", [this.params.username,item.path]);
                                    tx.executeSql("select * from likedphotos", [],(_, { rows }) =>{
                                       console.log(rows._array);
                                    } )}
                               );
                           }else{
                              //what photo is liked and who is it liked by?
                              db.transaction(
                                 tx => {
                                   tx.executeSql("delete from likedphotos where username = ? and path = ?", [this.params.username,item.path]);
                                   tx.executeSql("select * from likedphotos", [],(_, { rows }) =>{
                                    console.log(rows._array);
                                    })
                                 },
                               );
                           }
                        }}>
                           <Image source={this.state.heartIcon}></Image>
                        </TouchableOpacity>{/* send username of current account and picture info to comment*/}
                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('comments',{picture:{item},username:this.params.username})}>
                           <Image source={this.state.commentPath}></Image>
                        </TouchableOpacity>
                     </View>
                  </Swipeout>
                  {this.props.comments.map( (comment) => {
                     console.log(comment.username)
                     if(comment.pictureId == item.id){
                        return(
                           <Comment   liked = {comment.liked} commentId = {comment.id} username = {comment.username} iconImage = {this.state.iconImage}commentText={comment.commentText}/>
                        )
                     }
                  })}
                  </View>
                  )
               }}
               keyExtractor={item => item.id}
            />  
         </View>
      )
   }
}
const mapStateToProps = state => ({ comments: state.comments })


export default connect(mapStateToProps)(Photos)

const styles = StyleSheet.create ({
   input: {
      margin: 10,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      backgroundColor:'black',
      width:100
   },
   modalView:{
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      flexDirection:'column'
   },
   aboveImage:{
      flexDirection:'row',
      marginBottom:10,
      height:50,
      alignItems:'center'
   },
   iconImage:{
      borderRadius:20,
      width:50,
      height:50,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop:10,
      marginLeft:3
   },
   imageOptions:{
      flexDirection:'row',
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







