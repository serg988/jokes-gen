import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { NavigationContainer } from '@react-navigation/native'
import { MainNavigator } from './navigation/JokeNavigator'
import jokeReducer from './store/reducers/joke'

import { StyleSheet, Text, View } from 'react-native'

const rootReducer = combineReducers({
  joke: jokeReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
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
