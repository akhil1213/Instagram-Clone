import React, { Component } from 'react'
import { Text, View , StyleSheet} from 'react-native'

const PresentationalComponent = (props) => {
   return (
      <View>
         <Text style = {styles.myState} onPress = {props.updateState}>
            {props.myState}
         </Text>
      </View>
   )
}
export default PresentationalComponent

const styles = StyleSheet.create ({
    myState: {
       marginTop: 50,
       textAlign: 'center',
       color: 'blue',
       fontWeight: 'bold',
       fontSize: 20
    }
 })