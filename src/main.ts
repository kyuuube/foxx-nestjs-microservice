import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
    /**
     * This example contains a hybrid application (HTTP + TCP)
     * You can switch to a microservice with NestFactory.createMicroservice() as follows:
     *
     * const app = await NestFactory.createMicroservice(AppModule, {
     *  transport: Transport.TCP,
     *  options: { retryAttempts: 5, retryDelay: 3000 },
     * });
     * await app.listenAsync();
     *
     */
    const app = await NestFactory.create(AppModule)
    app.connectMicroservice({
        transport: Transport.TCP,
        options: { retryAttempts: 5, retryDelay: 3000 }
    })

    const options = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)

    await app.startAllMicroservicesAsync()
    await app.listen(3001)
}
bootstrap()
