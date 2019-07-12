import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import {HomeScreen, Feed, Profile, Configuracoes} from '../screens/Home';
import RandomScreen from '../screens/Random';
import DetailsScreen from '../screens/Details';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeScreen = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeScreen.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

HomeScreen.path = '';

const RandomScreen = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

RandomScreen.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} 
    name={
      Platform.OS === 'ios'
        ? `ios-shuffle${focused ? '' : '-outline'}`
        : 'md-shuffle'
    }
    />
  ),
};

RandomScreen.path = '';

const DetailsScreen = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

DetailsScreen.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused={focused} 
    name={
      Platform.OS === 'ios'
        ? `ios-eye${focused ? '' : '-outline'}`
        : 'md-eye'
    }/>
  ),
};

DetailsScreen.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeScreen,
  Random,
  Details,
});

tabNavigator.path = '';

export default tabNavigator;
