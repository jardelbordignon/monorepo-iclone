import { StyleSheet, Text, View } from 'react-native'

import { TCreateUserInput } from 'contracts/account'

import { accountApi } from 'front/api/account'
import { ZodType, useForm } from 'front/hooks/use-form'
import { useLocales } from 'front/hooks/use-locales'
import { Link, isWeb, useNavigate } from 'front/router'

export function SignUp(): JSX.Element {
  const { t } = useLocales()
  const navTo = useNavigate()

  const { btnControl, handleSubmit, register } = useForm<TCreateUserInput>({
    zodSchema: (z: ZodType) =>
      z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string().min(6),
      }),
  })

  const submit = handleSubmit(async data => {
    try {
      await accountApi.createUser(data)
      navTo('/login')
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <View style={s.container}>
      <Text style={s.text}>{t('mCreateYourAccount')}</Text>
      <Link to="/sign-in">
        <Text style={s.link}>{t('mSignIn')}</Text>
      </Link>
    </View>
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
