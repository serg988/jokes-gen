import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from '../screens/HomeScreen'
import FavScreen from '../screens/FavScreen'
import SettingsScreen from '../screens/SettingsScreen'

const Stack = createStackNavigator()

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Случайный Анекдот',
        }}
      />
      <Stack.Screen
        name='Fav'
        component={FavScreen}
        options={{ title: 'Сохранённые анекдоты' }}
      />
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator()

export const MainNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name='Главная' component={StackNavigator} />
      <Drawer.Screen name='Настройки' component={SettingsScreen} />
    </Drawer.Navigator>
  )
}
