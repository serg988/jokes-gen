import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react'
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Card from '../components/Card'
import CustomHeaderButton from '../components/HeaderButton'
import { bkgPalette } from '../constants/palette'

const HomeScreen = ({ navigation }) => {
  const swipeableRef = useRef(null)
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
      headerRight: () => {
        // console.log(fav.length);
        return (
          fav.length !== 0 && (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title='Save'
                iconName='ios-star'
                iconSize={34}
                color='white'
                onPress={() => navigation.navigate('Fav')}
              />
            </HeaderButtons>
          )
        )
      },
    })
  }, [navigation, fav])

  const onCountNextHandler = () => {
    setCount((prevState) => prevState + 1)
    if (count === rawText.length - 1) {
      fetchData()
      setCount(0)
      setRawText([])
    }
  }

  const onSaveHandler = (joke) => {
    swipeableRef.current.close()
    if (!joke) return
    if (fav && fav.length !== 0) {
      if (joke === fav[fav.length - 1].joke) {
        return
      }
    }

    const updatedFav = [...fav]
    const id = Math.round(new Date().getTime() * Math.random()).toString()
    updatedFav.push({ id, joke })
    setFav(updatedFav)
    AsyncStorage.setItem('jokes', JSON.stringify(updatedFav))
  }

  const RightActions = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.rightAction}>
          <Animated.Text
            style={[styles.actionText, { transform: [{ scale }] }]}
          >
            Сохранить
          </Animated.Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.screen}>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={(progress, dragX) => (
          <RightActions
            progress={progress}
            dragX={dragX}
            onPress={() => {
              onSaveHandler(rawText[count])
            }}
          />
        )}
      >
        <Card
          style={{
            margin: 10,
            backgroundColor: bkgPalette[Math.floor(Math.random() * 20)],
          }}
        >
          <TouchableOpacity
            onPress={onCountNextHandler}
            style={{ borderRadius: 10 }}
          >
            <Text style={styles.text}>
              {rawText.length !== 0 && rawText[count]}
            </Text>
            {/* <View style={styles.buttonContainer}>
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
            </View> */}
          </TouchableOpacity>
        </Card>
      </Swipeable>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#d8e1e9',
    padding: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
  },
  text: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  rightAction: {
    margin: 10,
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 10,
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
})

export default HomeScreen
