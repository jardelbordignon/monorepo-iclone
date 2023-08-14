import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app/app.module'
import { AuthenticationGuard } from './infra/guards'

function appConfig(app: INestApplication) {
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: process.env.CORS_ORIGIN || '*',
    // methods: ['GET', ' PUT', ' PATCH', ' POST', ' DELETE'],
  })

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new AuthenticationGuard(app.get(Reflector)))
}

function swaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('The backend documentation')
    .setVersion('0.1')
    .build()

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      apisSorter: 'alpha',
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
    },
  }

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('doc', app, document, customOptions)
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  appConfig(app)
  swaggerConfig(app)

  const logger = new Logger('Bootstrap')

  app
    .listen(process.env.PORT || 3001, '192.168.0.102')
    .then(async () => logger.log(`🚀 Running on: ${await app.getUrl()}`))
    .catch(err => logger.log(`❌ Error: ${err}`))
}

bootstrap()
