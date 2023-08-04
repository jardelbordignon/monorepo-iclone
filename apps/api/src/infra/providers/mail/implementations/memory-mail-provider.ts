import { IMailProvider } from '../i-mail-provider'

export class MemoryMailProvider implements IMailProvider {
  private message: any[] = []

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.message.push({
      path,
      subject,
      to,
      variables,
    })
  }
}
