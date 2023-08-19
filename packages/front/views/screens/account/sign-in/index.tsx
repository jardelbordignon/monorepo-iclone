import { StyleSheet, Text, View } from 'react-native'

import { TLoginInput } from 'contracts/account'

import { accountApi } from 'front/api/account'
import { Fade } from 'front/views/animations'
import { ZodType, useForm } from 'front/hooks/use-form'
import { useLocales } from 'front/hooks/use-locales'
import { Link, useNavigate } from 'front/router'
import { themes } from 'front/themes'

export function SignIn(): JSX.Element {
  const { t } = useLocales()
  const navTo = useNavigate()

  const { btnControl, handleSubmit, register } = useForm<TLoginInput>({
    zodSchema: (z: ZodType) =>
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
  })

  const submit = handleSubmit(async data => {
    try {
      await accountApi.login(data)
      navTo('/home')
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Fade>
      <View style={s.container}>
        <Text style={s.text}>{t('mAccessYourAccount')}</Text>
        <Link to="/sign-up">
          <Text style={s.link}>{t('mSignUp')}</Text>
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
