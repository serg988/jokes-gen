import React from 'react'
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import JokeItem from '../components/JokeItem'
import { deleteJoke, getFav } from '../store/actions/joke'

const FavScreen = () => {
  const dispatch = useDispatch()
 
  const favJokes = useSelector((state) => state.joke.fav)


  const onDeleteHandler = (id) => {
    dispatch(deleteJoke(id))
  }

  let content
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
              onDelete={() => onDeleteHandler(itemData.item.id)}
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
