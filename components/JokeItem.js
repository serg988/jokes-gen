import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Animated,
  TouchableOpacity,
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Card from './Card'
import { bkgPalette } from '../constants/palette'

const RightActions = ({ progress, dragX, onPress, id }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rightAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </View>
    </TouchableOpacity>
  )
}

const JokeItem = ({joke, onSwipeFromLeft, onDelete}) => {
  
  return (
    <Swipeable
      // renderLeftActions={LeftActions}
      // onSwipeableLeftOpen={onSwipeFromLeft}
      renderRightActions={(progress, dragX, ) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={onDelete}
        />
      )}
    >
      <Card
        style={{
          margin: 20,
          backgroundColor: bkgPalette[Math.floor(Math.random() * 20)],
        }}
      >
        {/* <TouchableOpacity
      onPress={props.onDelete.bind(this, props.id)}
      useForeground
    > */}
        <Text>{joke}</Text>
        {/* <Text style={styles.text}>{joke}</Text> */}
        {/* </TouchableOpacity> */}
      </Card>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
  },
  bkg: {},
  text: {
    fontSize: 18,
  },
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    flex: 1,
  },
  rightAction: {
    margin: 20,
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 5,
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
})

export default JokeItem
