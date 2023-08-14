import { useQuery } from '@tanstack/react-query'
import { StyleSheet, Text, View } from 'react-native'

import { accountApi } from 'front/api/account'
import { Link, isWeb } from 'front/router'
import { Translate } from 'front/views/animations'

// const fetchUsers = (): Promise<{ data: any }> =>
//  fetch('http://127.0.0.1:3001/v1/users').then(res => res.json())

export const Home = (): JSX.Element => {
  const { data, isSuccess } = useQuery({
    queryFn: accountApi.getUsers,
    queryKey: ['users'],
  })

  return (
    <Translate isWeb={isWeb}>
      <View style={s.container}>
        <Text style={s.text}>Home {isSuccess ? data.length : 'error'}</Text>
        <Link to="/about">
          <Text style={s.link}>About</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={s.link}>Sign In</Text>
        </Link>

        {isSuccess &&
          data.map(user => (
            <Text key={user.id} style={{ color: '#fff' }}>
              {user.email}
            </Text>
          ))}
      </View>
    </Translate>
  )
}

const s = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#111',
    flex: 1,
    height: isWeb ? '100vh' : undefined,
    justifyContent: 'center',
    width: isWeb ? '100vw' : undefined,
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
