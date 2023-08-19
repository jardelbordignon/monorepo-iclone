import NetInfo from '@react-native-community/netinfo'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Front } from 'front'

export default function App() {
  NetInfo.addEventListener(state => {
    console.log(!!state.isConnected)
  })

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <SafeAreaView style={{ flex: 1 }}>
        <Front />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
})
