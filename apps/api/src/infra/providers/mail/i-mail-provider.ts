export abstract class IMailProvider {
  abstract sendMail(to: string, subject: string, variables: any, path: string): void
}
