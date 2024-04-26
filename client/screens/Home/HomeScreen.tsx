import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

// partials
import HomeNav from './HomeNav'

const Home = () => {
  return (
    <View style={styles.screen}>
      <HomeNav/>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})

export default Home