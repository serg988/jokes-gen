import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StyleSheet, Text, View } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import FavScreen from './screens/FavScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
