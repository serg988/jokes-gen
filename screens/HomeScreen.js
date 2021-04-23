import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
} from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import Card from '../components/Card'
import CustomHeaderButton from '../components/HeaderButton'

const HomeScreen = ({ navigation }) => {
  const [rawText, setRawText] = useState([])
  const [count, setCount] = useState(0)
  const [fav, setFav] = useState([])

  useEffect(() => {
    const getJokesFromStorage = async () => {
      const fetchedJokes = await AsyncStorage.getItem('jokes')
      const parsedJokes = JSON.parse(fetchedJokes)
      if (parsedJokes) {
        setFav(parsedJokes)
      }
    }
    getJokesFromStorage()
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const fetchData = useCallback(async () => {
    const response = await fetch(
      'https://nameless-falls-80997.herokuapp.com/https://www.anekdot.ru/rss/randomu.html',
      {
        type: 'GET',
        headers: {
          'X-Requested-With': 'HttpRequest',
        },
      }
    )
    const resData = await response.text()
    const headerCutText = resData.slice(138)
    const tailCutText = headerCutText.split("]')")[0]
    const arr = tailCutText.split('\\",\\"').slice(0, -1)
    const newArray = arr.map((w) => w.replace(/<br>/g, ' '))
    const newArray1 = newArray.map((a) => a.replace(/\\\\\\/g, ' '))
    const newArr = newArray1.map((a) => a.replace(/\\r/g, ''))
    setRawText(newArr)
  }, [fetchData])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Save'
            iconName='ios-star'
            iconSize={34}
            onPress={() => navigation.navigate('Fav')}
          />
        </HeaderButtons>
      ),
    })
  }, [navigation])

  const onCountNextHandler = () => {
    setCount((prevState) => prevState + 1)
    if (count === rawText.length - 1) {
      fetchData()
      setCount(0)
      setRawText([])
    }
  }

  const onSaveHandler = (joke) => {
    if (!joke) return
    if (fav) {
      if (joke === fav[fav.length - 1]) {
        return
      }
    }

    const updatedFav = [...fav]
    updatedFav.push(joke)
    setFav(updatedFav)
    AsyncStorage.setItem('jokes', JSON.stringify(updatedFav))
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Text style={styles.text}>
          {rawText.length !== 0 && rawText[count]}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            color='orange'
            title='Следующий'
            onPress={onCountNextHandler}
          />
          <Button
            color='green'
            title='Сохранить'
            onPress={() => {
              onSaveHandler(rawText[count])
            }}
          />
        </View>
      </Card>
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
  },
  text: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
})

export default HomeScreen
