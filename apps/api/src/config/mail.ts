const isProd = process.env.NODE_ENV === 'production'

type MailProviderType = 'ethereal' | 'mailtrap' | 'ses'

type Type = {
  mailProvider: MailProviderType
}

export const mailtrapCredentials = () => ({
  pass: process.env.MAILTRAP_PASS,
  user: process.env.MAILTRAP_USER,
})

export const sesCredentials = {}

export const mailProviderConfig: Type = {
  mailProvider: process.env.MAIL_PROVIDER || isProd ? 'ses' : 'mailtrap',
}
