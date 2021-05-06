import React, { useEffect, useRef, useCallback, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Card from '../components/Card'
import CustomHeaderButton from '../components/HeaderButton'
import { bkgPalette } from '../constants/constants'

import { getFav, saveFav, setJokes, next } from '../store/actions/joke'
import { getNumber } from '../shared/random'

const Itemm = ({ item }) => {
  const fav = useSelector((state) => state.joke.fav)
  const dispatch = useDispatch()
  const swipeableRef = useRef(null)
  const fontSize = useSelector((state) => state.settings.fontSize)

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
    <Swipeable
      ref={swipeableRef}
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={() => {
            onSaveHandler(item)
          }}
        />
      )}
    >
      <Card
        style={{
          margin: 12,
          backgroundColor: item.bkg,
          // backgroundColor: bkgPalette[getNumber()],
        }}
      >
        <Text style={{ fontSize: fontSize }}>{item.joke}</Text>
      </Card>
    </Swipeable>
  )
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const fav = useSelector((state) => state.joke.fav)

  const fetchedJokes = useSelector((state) => state.joke.jokes)

  useEffect(() => {
    if (fetchedJokes.length <= 30) {
      dispatch(setJokes())
    }
  }, [dispatch, fetchedJokes])

  useEffect(() => {
    dispatch(getFav())
  }, [])

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

  const nextHandler = () => {
    Alert.alert(
      'Ого, 30 штук!',
      'Вы должны разработчику приложения 30 рублей за просмотр 30 анекдотов! Еще 30?',
      [
        { text: 'Нет, хватит', style: 'default' },
        {
          text: 'Да, конечно!',
          style: 'destructive',
          onPress: () => {
            dispatch(next())
          },
        },
      ]
    )
  }

  const renderItem = useCallback(({ item }) => {
    return <Itemm item={item} />
  }, [])

  return (
    <View style={styles.screen}>
      {fetchedJokes.length === 0 ? (
        <ActivityIndicator size='large' color='#f4511e' />
      ) : (
        <FlatList
          keyExtractor={() => uuidv4()}
          data={fetchedJokes}
          onEndReached={nextHandler}
          onEndReachedThreshold={0.001}
          renderItem={renderItem}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#d8e1e9',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
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
