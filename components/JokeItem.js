import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import Card from './Card'

const JokeItem = (props) => (
  <Card style={styles.card}>
    <View>
      <TouchableOpacity onPress={props.onDelete} useForeground>
        <Text style={styles.text}>{props.joke}</Text>
      </TouchableOpacity>
    </View>
  </Card>
)

const styles = StyleSheet.create({
  card: {
    margin: 20,
  },
  text: {
    fontSize: 18,
  },
})

export default JokeItem
