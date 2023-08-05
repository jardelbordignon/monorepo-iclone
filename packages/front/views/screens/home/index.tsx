import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { TGetUsersResponse } from 'contracts/account'

import { accountApi } from 'front/api/account'
import { Link, isWeb } from 'front/router'
import { Translate } from 'front/views/animations'

export const Home = (): JSX.Element => {
  const [users, setUsers] = useState<TGetUsersResponse>()

  const loadUsers = async () => {
    try {
      const res = await accountApi.getUsers()

      setUsers(res)

      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!users) loadUsers()
  }, [])

  return (
    <Translate isWeb={isWeb}>
      <View style={s.container}>
        {users &&
          users.map(user => (
            <Text key={user.id} style={{ color: '#fff' }}>
              {user.email}
            </Text>
          ))}

        <Text style={s.text}>Home Test</Text>
        <Link to="/about">
          <Text style={s.link}>About</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={s.link}>Sign In</Text>
        </Link>
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
