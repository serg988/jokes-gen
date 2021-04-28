import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Card from '../components/Card'
import CustomHeaderButton from '../components/HeaderButton'
import { bkgPalette } from '../constants/constants'

import { getFav, resetJokes, saveFav, setJokes } from '../store/actions/joke'

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const swipeableRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    dispatch(setJokes())
    dispatch(getFav())
  }, [dispatch])

  const fav = useSelector((state) => state.joke.fav)

  const fetchedJokes = useSelector((state) => state.joke.jokes)
  const fontSize = useSelector((state) => state.settings.fontSize)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          fav &&
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
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title='Menu'
              iconName='ios-menu'
              iconSize={34}
              color='white'
              onPress={() => navigation.openDrawer()}
            />
          </HeaderButtons>
        )
      },
    })
  }, [navigation, fav])

  const onCountNextHandler = () => {
    setCount((prevState) => prevState + 1)
    if (count === fetchedJokes.length - 1) {
      dispatch(resetJokes())
      dispatch(setJokes())
      setCount(0)
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
    dispatch(saveFav(joke))
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
      {fetchedJokes.length === 0 ? (
        <ActivityIndicator size='large' color='#f4511e' />
      ) : (
        <Swipeable
          ref={swipeableRef}
          renderRightActions={(progress, dragX) => (
            <RightActions
              progress={progress}
              dragX={dragX}
              onPress={() => {
                onSaveHandler(fetchedJokes[count])
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
              <Text style={{ fontSize: fontSize }}>
                {fetchedJokes.length !== 0 && fetchedJokes[count]}
              </Text>
            </TouchableOpacity>
          </Card>
        </Swipeable>
      )}
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
  // text: {
  //   fontSize: {fontSize},
  // },
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
