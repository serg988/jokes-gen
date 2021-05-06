import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const About = ({ navigation }) => (
  <View style={styles.screen}>
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Особенности приложения:</Text>
    </View>
    <View style={styles.textBody}>
      <Text>
        Используются официальные источники: allanecdots.ru, anekdot.ru
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Минималистичный дизайн - оставлено только самое необходимое.
      </Text>
    </View>
    <Text style={styles.textBottom}>Версия: 1.1.0</Text>
    <Text style={styles.textBottom}>Written by: Sergey Popov</Text>
    <Text style={styles.textBottom}>Email me: serg98888@gmail.com</Text>
    <View style={styles.buttonContainer}>
      <Button
        title='Назад'
        color='#f4511e'
        onPress={() => navigation.goBack()}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  screen: {
    padding: 40,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerContainer: {
    marginVertical: 70,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textBody: {
    marginBottom: 30,
  },
  textBottom: {
    color: 'steelblue',
  },
  buttonContainer: {
    // height: '30%',
    marginTop: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default About
