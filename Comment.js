import React, {useState} from 'react'
// import {Text} from 'react-native'
import {connect, dispatch} from 'react-redux'

import { TextInput,Modal,Dimensions, Text, TouchableOpacity,FlatList, View, StyleSheet,  ScrollView, Image, Button } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
/*
    The props that were sent to this comment component are the following:
    commentId- The comment id is neccessary because now when I like a comment, I can loop through
    the comments array from redux and find the comment that just has been liked. Then I can update this
    array, such that the comment that just has been liked has liked:true inside of that object now.
*/ 

function Comment(props){
    const [image, setImage] = useState(require('./assets/like.png'));

    const likeComment=() =>{
        console.log(props.commentId)
        // console.log(props.comments)
        let index = 0
        for (index = 0; index < props.comments.length; index++) {
            //find this specific comment's index in the comment array and then update it in that array.
            if(props.comments[index].commentInfo.id == props.commentId){
                break;
            } 
        }
        
        //send new array to redux but check if you're liking or disliking
        //also update the image state, if its liked then it should be a dislike image
        if (image == require('./assets/dislike.png')){
            props.comments[index].commentInfo.liked = false
            props.likeComment(props.comments)
            setImage(require('./assets/like.png'))
        }else{
            props.comments[index].commentInfo.liked = true
            props.likeComment(props.comments)
            setImage(require('./assets/dislike.png'))
        }
        console.log(props.comments)
    }
    const likedOrNot = () =>{
        let image = ''
        console.log(props.liked)
        image = props.liked ? require('./assets/like.png') : require('./assets/dislike.png')
        return image
    }
    return(
        <View style={styles.container}>
            <Image source={{uri:props.iconImage}} style={styles.image}></Image>
            <Text style={styles.comment}>
                <Text style={styles.username}>{props.username}</Text>
                <Text>  {props.commentText}</Text>
            </Text>
            {/* <Text style={styles.comment}>{props.commentText}</Text> */}
            <TouchableOpacity onPress={likeComment} style={styles.touchable}>
                <Image source={image} style={styles.heartButton}></Image>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create ({
    touchable:{
        // position:'absolute',
        // right:0,
    },
    container:{
        flexDirection:'row',

    },
    image:{
        borderRadius:20,
        width:20,
        height:20
    },
    username:{
        color:'white',
        fontWeight:'bold',
    },
    comment:{
        width:'80%',
        marginLeft:3
    },
    heartButton:{
        height:20,
        width:20,
        // flexDirection:'row',
        // alignItems:'flex-end'
    },
    touchable:{
        position:'absolute',
        right:0,
        // flexDirection:'column',
        // justifyContent:'center'
    }

})
const mapStateToProps = state => ({ comments: state.comments })

function mapDispatchToProps(dispatch){
    return {
       likeComment: (updatedComments) => {
            dispatch(
                {
                    type:'LIKE_COMMENT',
                    payload:updatedComments
                }
            )
        },
        
        //action gets dispatched and updated comments is sent to redux store.
    }
 }


export default connect(mapStateToProps,mapDispatchToProps)(Comment)