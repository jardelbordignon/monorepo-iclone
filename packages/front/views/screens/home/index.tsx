import { StyleSheet, Text, View } from 'react-native'

import { Link, isWeb } from 'front/router'
import { Fade } from 'front/views/animations'
import Gremio from 'front/assets/gremio.svg'
import { themes } from 'front/themes'

export const Home = (): JSX.Element => {
  if (isWeb) document.title = 'Home page'

  return (
    <Fade>
      <View style={s.container}>
        <Gremio width={200} height={200} />
        <Link to="/users">
          <Text style={s.link}>Users</Text>
        </Link>
      </View>
    </Fade>
  )
}

const s = StyleSheet.create({
  container: {
    ...themes.styles.fullScreen,
    alignItems: 'center',
    backgroundColor: '#111',
    justifyContent: 'center',
  },
  link: {
    color: 'blue',
    fontSize: 20,
  },
  text: {
    color: '#f1f1f1',
    fontSize: 40,
    fontWeight: 'bold',
  },
})
