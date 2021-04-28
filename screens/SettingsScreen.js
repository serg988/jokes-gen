import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, Button, StyleSheet } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { setSource, setFontSize } from '../store/actions/settings'

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const [font, setFont] = useState(1)
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Источник анекдотов:</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          setValue(value)
          dispatch(setSource(value))
        }}
        value={value}
      >
        <RadioButton.Item color='#f4511e' label='Allanekdots.ru' value={0} />
        <RadioButton.Item color='#f4511e' label='Anekdot.ru' value={1} />
      </RadioButton.Group>

      <View style={styles.separator} />

      <Text style={styles.title}>Размер шрифта:</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          setFont(value)
          dispatch(setFontSize(value))
        }}
        value={font}
      >
        <RadioButton.Item color='#f4511e' label='Маленький' value={0} />
        <RadioButton.Item color='#f4511e' label='Средний' value={1} />
        <RadioButton.Item color='#f4511e' label='Большой' value={2} />
        <RadioButton.Item color='#f4511e' label='XXL' value={3} />
      </RadioButton.Group>
      <View style={styles.buttonContainer}>
        <Button
          title='Назад'
          color='#f4511e'
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  separator: {
    // flex: 1,
    height: 1,
    backgroundColor: 'red',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    // height: '30%',
    marginTop: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SettingsScreen
