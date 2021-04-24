import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'

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

  const deleteJoke = (id) => {
    if (favJokes) {
      const updatedFav = favJokes.filter((joke) => joke.id !== id)
      setFavJokes(updatedFav)
      setStorage(JSON.stringify(updatedFav))
    }
  }

  const setStorage = async (fav) => {
    try {
      await AsyncStorage.setItem('jokes', fav )
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteHandler = (id) => {
    Alert.alert('Удалить анекдот?', 'Вы точно хотите удалить?', [
      { text: 'Нет', style: 'cancel' },
      {
        text: ' Да',
        style: 'destructive',
        onPress: () => deleteJoke(id),
      },
    ])
  }
  let content
  console.log(favJokes)
  if (favJokes.length !== 0) {
    content = (
      <View>
        {/* <Text>XXXXXXXXXXXXXXXXXXX</Text> */}
        <FlatList
          keyExtractor={(item) => Math.random().toString()}
          data={favJokes}
          renderItem={(itemData) => (
            <JokeItem
              joke={itemData.item.joke}
              id={itemData.item.id}
              onDelete={onDeleteHandler}
            />
          )}
        />
      </View>
    )
  } else {
    content = (
      <View>
        <Text>Сохраненных анекдотов еще нет</Text>
      </View>
    )
  }

  return content
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
