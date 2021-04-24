import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'

import JokeItem from '../components/JokeItem'

const FavScreen = (props) => {
  const [favJokes, setFavJokes] = useState([])
  useEffect(() => {
    const getJokesFromStorage = async () => {
      try {
        const fetchedJokes = await AsyncStorage.getItem('jokes')
        const parsedJokes = JSON.parse(fetchedJokes)
        setFavJokes(parsedJokes)
      } catch (error) {
        Alert.alert(
          ('Ничего не найдено',
          'Вы еще ничего не сохранили',
          [{ text: 'ОК', style: 'cancel' }])
        )
      }
    }
    getJokesFromStorage()
  }, [])

  const deleteJoke = (id) => {
    console.log(id)
    if (favJokes) {
      const updatedFav = favJokes.filter((joke) => joke.id !== id)
      setFavJokes(updatedFav)
      AsyncStorage.setItem('jokes', JSON.stringify(updatedFav))
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
  // console.log(favJokes)
  if (favJokes.length !== 0) {
    content = (
      <View style={styles.screen}>
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
      <View style={styles.screen}>
        <Text style={{ fontSize: 18 }}>Сохраненных анекдотов еще нет</Text>
      </View>
    )
  }

  return content
}

const styles = StyleSheet.create({
  screen: {
    // padding: 30,
    backgroundColor: '#d8e1e9',
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
