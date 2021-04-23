import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import Card from '../components/Card'
import JokeItem from '../components/JokeItem'

const FavScreen = (props) => {
  const [favJokes, setFavJokes] = useState([])
  useEffect(() => {
    const getJokesFromStorage = async () => {
      const fetchedJokes = await AsyncStorage.getItem('jokes')
      const parsedJokes = JSON.parse(fetchedJokes)
      setFavJokes(parsedJokes)
    }
    getJokesFromStorage()
  }, [])

  const onDeleteHandler = () => {
    
  }

  return (
    <View>
      <FlatList
        keyExtractor={(item) => Math.random().toString()}
        data={favJokes}
        renderItem={(itemData) => (
          <JokeItem joke={itemData.item} onDelete={onDeleteHandler} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 25,
    width: '100%',
    margin: 30,
  },
})

export default FavScreen
