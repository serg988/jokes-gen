import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { MainNavigator } from './navigation/JokeNavigator'

import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
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
