import React from 'react'
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';


import { Ionicons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/Ionicons';

import Expo from 'expo';
import { StatusBar, Platform, View } from 'react-native'
import Home from './src/screens/Home'
import Details from './src/screens/Details'
import Random from './src/screens/Random'
import { createSwitchNavigator, 
  createAppContainer, 
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
  } from "react-navigation";


class App extends React.PureComponent{
  render(){
    return <AppContainer/>
      
  }
}

export default App

const DashboardTabNavigator = createBottomTabNavigator({
  Home,
  Details,
  Random
},{
  navigationOptions: ({navigation}) =>{
    const {routeName} = navigation.state.routes[navigation.state.index];
    return{
      headerTitle: routeName
    };
  }
})

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerLeft: (
        <Icon 
          name='md-menu' 
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.openDrawer()}
          size={25} />
          )
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  List: {
    screen: DashboardStackNavigator
  },
  Details: {
      screen: DashboardStackNavigator
  },
  Random: {
    screen: DashboardStackNavigator
  }
});
const AppSwitchNavigator = createSwitchNavigator({
  List: {
    screen: AppDrawerNavigator
  },
  Details: {
      screen: AppDrawerNavigator
  },
  Random: {
    screen: AppDrawerNavigator

  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);



