import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native'
import Card from './Card'
import { bkgPalette } from '../constants/palette'

const JokeItem = (props) => (
  <Card
    style={{
      margin: 20,
      backgroundColor: bkgPalette[Math.floor(Math.random() * 20)],
    }}
  >
    <TouchableOpacity
      onPress={props.onDelete.bind(this, props.id)}
      useForeground
    >
      <Text style={styles.text}>{props.joke}</Text>
    </TouchableOpacity>
  </Card>
)

const styles = StyleSheet.create({
  card: {
    margin: 20,
  },
  bkg: {},
  text: {
    fontSize: 18,
  },
})

export default JokeItem
