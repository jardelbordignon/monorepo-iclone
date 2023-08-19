import { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import { Link, isWeb } from 'front/router'
import { Fade } from 'front/views/animations'
import Gremio from 'front/assets/gremio.svg'
import { useGetUsers } from 'front/api/hooks/account'
import { Pagination } from 'front/views/components/pagination'

export const UserList = (): JSX.Element => {
  const [page, setPage] = useState(1)
  const perPage = 3
  const { data, success } = useGetUsers({ page, perPage })

  if (isWeb) document.title = 'User List'

  return (
    <Fade>
      <View style={s.container}>
        <Gremio width={200} height={200} />
        <Text style={s.text}>Home {success ? data.users.length : 'error'}</Text>
        <Link to="/">
          <Text style={s.link}>Home</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={s.link}>Sign In</Text>
        </Link>

        {success && (
          <>
            {data.users.map(user => (
              <Text key={user.id} style={{ color: '#fff' }}>
                {user.email}
              </Text>
            ))}

            <Pagination
              totalCountOfRegisters={data.totalCount}
              currentPage={page}
              registersPerPage={perPage}
              buttonsDelta={1}
              onPageChange={setPage}
            />
          </>
        )}
      </View>
    </Fade>
  )
}

const s = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#111',
    flex: 1,
    height: isWeb ? ('100vh' as never) : undefined,
    justifyContent: 'center',
    width: isWeb ? ('100vw' as never) : undefined,
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
