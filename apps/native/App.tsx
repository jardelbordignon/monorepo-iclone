import { StatusBar } from 'expo-status-bar'
import { Front } from 'front'
import { StyleSheet, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <Front />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
})
