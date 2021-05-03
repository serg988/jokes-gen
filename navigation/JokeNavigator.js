import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from '../screens/HomeScreen'
import FavScreen from '../screens/FavScreen'
import SettingsScreen from '../screens/SettingsScreen'
import AboutScreen from '../screens/AboutScreen'

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
          title: 'Анекдоты',
          headerTitleStyle: {
            // fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name='Fav'
        component={FavScreen}
        options={{ title: 'Сохранённые анекдоты' }}
      />
      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
        options={{ title: 'Настройки' }}
      />
    </Stack.Navigator>
  )
}
const SettingsNavigator = () => {
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
        name='Settings'
        component={SettingsScreen}
        options={{ title: 'Настройки' }}
      />
    </Stack.Navigator>
  )
}

const AboutNavigator = () => {
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
        name='About'
        component={AboutScreen}
        options={{ title: 'О приложении' }}
      />
    </Stack.Navigator>
  )
}

const FavNavigator = () => {
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
        name='Fav'
        component={FavScreen}
        options={{ title: 'Сохранённое' }}
      />
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator()

export const MainNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
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
      <Drawer.Screen name='Главная' component={StackNavigator} />
      <Drawer.Screen name='Сохраненное' component={FavNavigator} />
      <Drawer.Screen name='Настройки' component={SettingsNavigator} />
      <Drawer.Screen name='О приложении' component={AboutNavigator} />
    </Drawer.Navigator>
  )
}
