import * as fs from 'fs'

import { SES } from 'aws-sdk'
import * as handlebars from 'handlebars'
import * as nodemailer from 'nodemailer'

import { IMailProvider } from '../i-mail-provider'

export class SESMailProvider implements IMailProvider {
  private client: nodemailer.Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    })
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')

    const templateParse = handlebars.compile(templateFileContent)

    const html = templateParse(variables)

    await this.client.sendMail({
      from: 'ProjectName <no-reply@bordignon.dev>',
      html,
      subject,
      to,
    })
  }
}
