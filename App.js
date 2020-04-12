import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PresentationalComponent from './PresentationalComponent'
import Inputs from './Inputs.js'
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Lists from './Lists.js'
import Comments from './Comments'
import GestureRecognizer from 'react-native-swipe-gestures';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import uuid from 'react-native-uuid';
// import Realm from './databases/schemas'

const Stack = createStackNavigator();
const initialState = {
   commentText:'',
   comments:[]
}
const reducer = (state = initialState,action) => {
   console.log(action.payload)
   switch(action.type){
      case 'ADD_COMMENT':
         return  {
         comments: [
           ...state.comments,
           {
             commentInfo: action.payload,
           }
         ]
      }
       case 'LIKE_COMMENT':
          return{
             comments:action.payload
          }
      }
   return state
}
const Store = createStore(reducer)
export default class App extends React.Component {
   state = {
      myState: 'Lebron James'
   }
   
   render() {
      return (
         <Provider store={Store}>
            <NavigationContainer>
               <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={Inputs} />
                  <Stack.Screen name="swiping" component = {PresentationalComponent}/>

                  <Stack.Screen name="lists" component={Lists} />
                  <Stack.Screen name="comments" component={Comments} />
               </Stack.Navigator>
            </NavigationContainer>
        </Provider>
      );
   }
}



// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={Inputs} />
//         {/* <Stack.Screen name="Details">
//             <PresentationalComponent myState = {this.state.myState} updateState = {this.updateState}/>
//         </Stack.Screen> component={PresentationalComponent}/> */}
//          <Stack.Screen name="dontmatter" component={PresentationalComponent} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;