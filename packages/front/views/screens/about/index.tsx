import { StyleSheet, Text, View } from 'react-native'

import { Link, isWeb } from 'front/router'

export const About = (): JSX.Element => {
  return (
    <View style={s.container}>
      <Text style={s.text}>About</Text>
      <Link to="/">
        <Text style={s.link}>Home</Text>
      </Link>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    width: isWeb ? '100vw' : undefined,
    height: isWeb ? '100vh' : undefined,
  },
  text: {
    fontWeight: 'bold',
    color: '#f1f1f1',
    fontSize: 40,
  },
  link: {
    color: 'blue',
    fontSize: 20,
  },
})
