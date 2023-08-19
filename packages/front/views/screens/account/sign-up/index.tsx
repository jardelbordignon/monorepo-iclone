import { StyleSheet, Text, View } from 'react-native'

import { TCreateUserInput } from 'contracts/account'

import { accountApi } from 'front/api/account'
import { Fade } from 'front/views/animations'
import { ZodType, useForm } from 'front/hooks/use-form'
import { useLocales } from 'front/hooks/use-locales'
import { Link, useNavigate } from 'front/router'
import { Button, Input } from 'front/views/components'
import { storage } from 'front/utils/storage'
import { themes } from 'front/themes'

type CreateUserInput = TCreateUserInput & {
  password_confirmation: string
}

export function SignUp(): JSX.Element {
  const { t } = useLocales()
  const navTo = useNavigate()

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#%*$!%?&]{6,}$/g

  const { btnControl, handleSubmit, register } = useForm<CreateUserInput>({
    zodSchema: (z: ZodType) =>
      z
        .object({
          email: z.string().email(),
          name: z.string(),
          password: z.string().nonempty().regex(regex),
          password_confirmation: z.string().nonempty(),
        })
        .superRefine(({ password, password_confirmation }, ctx) => {
          if (password !== password_confirmation) {
            ctx.addIssue({
              code: 'custom',
              params: [{ type: 'invalid_password_confirmation_match' }],
              path: ['password'],
            })
            ctx.addIssue({
              code: 'custom',
              params: [{ type: 'invalid_password_confirmation_match' }],
              path: ['password_confirmation'],
            })
          }
        }),
  })

  const submit = handleSubmit(async data => {
    try {
      await accountApi.createUser(data)
      storage.removeAllThatStartWith('users')
      navTo('/users')
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Fade>
      <View style={s.wrapper}>
        <View style={s.form}>
          <Text style={s.text}>{t('mCreateYourAccount')}</Text>
          <Link to="/sign-in">
            <Text style={s.link}>{t('mSignIn')}</Text>
          </Link>

          <View>
            <Input {...register('name')} label="Name" placeholder="your name" />
            <Input {...register('email')} label="Email" placeholder="your email" />
            <Input
              {...register('password')}
              label={'Senha'}
              placeholder="*******"
              autoCorrect={false}
              autoCapitalize="none"
              secureEntry
            />
            <Input
              {...register('password_confirmation')}
              label="Confirme sua senha"
              placeholder="*******"
              autoCorrect={false}
              autoCapitalize="none"
              secureEntry
            />
            <Button {...btnControl} title="Cadastrar" onPress={submit} mt={16} />
          </View>
        </View>
      </View>
    </Fade>
  )
}

const s = StyleSheet.create({
  wrapper: {
    ...themes.styles.fullScreen,
    alignItems: 'center',
    backgroundColor: '#111',
    justifyContent: 'center',
    padding: 10,
  },
  form: {
    height: 'auto',
    width: '100%',
    maxWidth: 500,
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
