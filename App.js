import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { NavigationContainer } from '@react-navigation/native'
import { MainNavigator } from './navigation/JokeNavigator'
import jokeReducer from './store/reducers/joke'
import settingsReducer from './store/reducers/settings'

const rootReducer = combineReducers({
  joke: jokeReducer,
  settings: settingsReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <MainNavigator />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  )
}

