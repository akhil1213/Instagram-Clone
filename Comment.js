import React from 'react'
// import {Text} from 'react-native'

import { TextInput,Modal,Dimensions, Text, TouchableOpacity,FlatList, View, StyleSheet,  ScrollView, Image, Button } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

likeComment=() =>{

}
const Comment = (props) =>{
    return(
        <View style={styles.container}>
            <Image source={{uri:props.iconImage}} style={styles.image}></Image>
            <Text style={styles.username}>{props.username}</Text>
            <Text style={styles.comment}>{props.commentText}</Text>
            <TouchableOpacity onPress={likeComment}>
                <Image style={styles.heartButton} source={require('./assets/like.png')}></Image>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create ({
    container:{
        flexDirection:'row'
    },
    image:{
        borderRadius:20,
        width:20,
        height:20
    },
    username:{
        color:'white',
        fontWeight:'bold'
    },
    comment:{
        marginLeft:3
    },
    heartButton:{
        height:20,
        width:20,
        // flexDirection:'row',
        // alignItems:'flex-end'
        position:'absolute',
        right:0
    }

})
const mapStateToProps = state => ({ comments: state.comments })

function mapDispatchToProps(dispatch){
    return {
       addComment: (commentInfo) => {
        dispatch({type:'LIKE_COMMENT',payload:commentInfo})
        console.log(commentInfo)
        }
    }
 }


export default connect(mapStateToProps,mapDispatchToProps)(Comment)