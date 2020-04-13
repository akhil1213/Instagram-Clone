import React, {Component} from 'react'
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
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

class Comment extends Component{
    constructor(props){
        super(props)
        console.log(this.props.liked)
    }
    state={
        image:this.props.liked == 1 ? require('./assets/dislike.png') : require('./assets/like.png')
    }

    likeComment=() =>{
        console.log(this.props.commentId)
        // console.log(props.comments)
        let index = 0
        for (index = 0; index < this.props.comments.length; index++) {
            //find this specific comment's index in the comment array and then update it in that array.
            if(this.props.comments[index].id == this.props.commentId){
                break;
            } 
        }
        //send new array to redux but check if you're liking or disliking
        //also update the image state, if its liked then it should be a dislike image
        if (this.state.image == require('./assets/dislike.png')){//this means your unliking the comment.
            this.props.comments[index].liked = 0
            this.props.likeComment(props.comments)
            this.setState({image:require('./assets/like.png')})
            this.updateCommentDb(0,this.props.commentId)
        }else{
            this.props.comments[index].liked = 1
            this.props.likeComment(this.props.comments)
            this.setState({image:require('./assets/dislike.png')})
            this.updateCommentDb(1,this.props.commentId)
        }
        console.log(this.props.comments)
    }
    updateCommentDb = (liked,commentId) => {
        console.log(liked + "commentid;" + commentId)
        db.transaction( (tx) => {
            tx.executeSql("update comments set liked = " + liked + "where id = ?;" , [commentId])
            tx.executeSql("select * from comments", [], (_, { rows }) =>{
                console.log(rows._array)
            });
        })
    }
    likedOrNot = () =>{
        let image = ''
        console.log(this.props.liked)
        image = this.props.liked == 1 ? require('./assets/like.png') : require('./assets/dislike.png')
        this.setState({image})
    }
    render(){
        return(
            <View style={styles.container}>
                <Image source={{uri:this.props.iconImage}} style={styles.image}></Image>
                <Text style={styles.comment}>
                    <Text style={styles.username}>{this.props.username}</Text>
                    <Text>  {this.props.commentText}</Text>
                </Text>
                {/* <Text style={styles.comment}>{props.commentText}</Text> */}
                <TouchableOpacity onPress={this.likeComment} style={styles.touchable}>
                    <Image source={this.state.image} style={styles.heartButton}></Image>
                </TouchableOpacity>
            </View>
        )
    }
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