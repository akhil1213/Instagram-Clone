import React, { Component } from 'react'
import { TextInput,Modal,Dimensions, Text, TouchableOpacity,FlatList, View, StyleSheet,  ScrollView, Image, Button } from 'react-native'
import {connect, dispatch} from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import uuid from 'react-native-uuid'


class Comments extends Component {
    constructor(props){
        super(props)
        this.params = this.props.route.params
    }
    state={
        commentText:''
    }
    buttonPressed = () =>{
        console.log(this.params)
        var commentInfo= {
            commentText:this.state.commentText,
            pictureId:this.params.picture.item.id,
            id:uuid.v1(),
            liked:false
        }
        this.props.addComment(commentInfo)
        this.props.navigation.goBack()
    }
    render(){
        // const { params } = this.props.navigation.state;
        // const addComment = params ? params.addComment : null;
        return (
            <View >
                <TextInput  onChangeText={(text) => {this.setState({commentText:text})}}/>
                <TouchableOpacity title="Send Comment" onPress = {this.buttonPressed.bind(this)}><Text>Lebron</Text></TouchableOpacity>
            </View>
        )
    }
}



function mapDispatchToProps(dispatch){
    return {
       addComment: (commentInfo) => {
        dispatch({type:'ADD_COMMENT',payload:commentInfo})
        console.log(commentInfo)
        }
    }
 }


 export default connect(null,mapDispatchToProps)(Comments)