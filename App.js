import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PresentationalComponent from './PresentationalComponent'
import Inputs from './Inputs.js'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Lists from './Lists.js'
import GestureRecognizer from 'react-native-swipe-gestures';


const Stack = createStackNavigator();

export default class App extends React.Component {
   state = {
      myState: 'Lebron James'
   }
   updateState = () => {
     if(this.state.myState=='Lebron James' ){
        this.setState({ myState: 'Kobe Bryant' })
     }else{
        this.setState({myState:'Lebron James'})
     }
   }
   render() {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Inputs} />
            <Stack.Screen name="swiping" component = {PresentationalComponent}>
            </Stack.Screen>
            <Stack.Screen name="lists" component={Lists} />
          </Stack.Navigator>
        </NavigationContainer>
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