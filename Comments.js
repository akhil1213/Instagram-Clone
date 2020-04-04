import React, { Component } from 'react'
import { TextInput,Modal,Dimensions, Text, TouchableOpacity,FlatList, View, StyleSheet,  ScrollView, Image, Button } from 'react-native'
import {connect, dispatch} from 'react-redux'



class Comments extends Component {
    constructor(props){
        super(props)
    }
    state={
        commentText:''
    }
    buttonPressed = () =>{
        this.props.addComment(this.state.commentText)
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

function addTodo(text) {
    return {
        type:'ADD_COMMENT',
        payload:text
    }
  }

function mapDispatchToProps(dispatch){
    return {
       addComment: (text) => {
        dispatch({type:'ADD_COMMENT',payload:text})
        console.log(text)
        }
    }
 }


 export default connect(null,mapDispatchToProps)(Comments)