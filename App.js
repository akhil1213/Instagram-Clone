import React from 'react';
import PresentationalComponent from './components/PresentationalComponent'
import Inputs from './components/Inputs.js'
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Photos from './components/Photos'
import AddComment from './components/AddComment'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

const Stack = createStackNavigator();

const initialState = {
   commentText:'',
   comments:[]
}
// explains how redux works, redux is important when sibling components update each other. 
//https://stackoverflow.com/questions/41939171/react-redux-concept-vs-server-call-requests
const reducer = (state = initialState,action) => {
   console.log(action.payload)
   switch(action.type){
      case 'ADD_COMMENT':
         return  {
         comments: [
           ...state.comments,
            action.payload,
         ]
      }
       case 'UPDATE_COMMENT'://works with deleting/liking/disliking a comment.
          return{
             comments:action.payload
          }
      }
   return state
}
const Store = createStore(reducer)
export default class App extends React.Component {
   constructor(props){
      super(props)
      db.transaction( (tx) => {
         tx.executeSql("select * from comments", [], (_, { rows }) =>{
            console.log("comments:")
            console.log(rows._array)
            initialState.comments = rows._array
         });
      });
   }
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
                  <Stack.Screen name="photos" component={Photos} />
                  <Stack.Screen name="comments" component={AddComment} />
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