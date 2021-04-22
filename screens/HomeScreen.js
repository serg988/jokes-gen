import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Card from '../components/Card'

const HomeScreen = () => {
  const [rawText, setRawText] = useState([])
  const [count, setCount] = useState(0)

  const fetchData = useCallback(async () => {
    const response = await fetch(
      'https://nameless-falls-80997.herokuapp.com/https://www.anekdot.ru/rss/randomu.html',
      {
        type: 'GET',
        // contentType: 'application/json',
        // // set the request header authorization to the bearer token that is generated
        headers: {
          'X-Requested-With': 'HttpRequest',
          // Origin: 'http://localhost:3000',
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

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const countNext = () => {
    setCount((prevState) => prevState + 1)
    if (count === rawText.length - 1) {
      fetchData()
      setCount(0)
      setRawText([])
    }
  }
  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Text style={styles.text}>
          {rawText.length !== 0 && rawText[count]}
        </Text>
        <View style={styles.buttonContainer}>
          <Button title='Еще' onPress={countNext} />
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
    marginTop: 50,
  },
})

export default HomeScreen
