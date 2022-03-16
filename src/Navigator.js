import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./Screens/HomeScreen";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;

// export class TabScreen extends Component {
//   render() {
//     return (
//       <Tab.Navigator>
//         <Tab.Screen name="Popular_Articles" component={Popular_articles} />
//         <Tab.Screen
//           name="Recommended_Articles"
//           component={Recommended_articles}
//         />
//       </Tab.Navigator>
//     );
//   }
// }
