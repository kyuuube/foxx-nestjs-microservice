import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as helmet from 'helmet'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import * as express from 'express';
import { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {
    dotenv.config()
    const app = await NestFactory.create(AppModule)
    const rootDir = join(__dirname, '..');
    app.use('/public', express.static(join(rootDir , 'public')));
    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalInterceptors(new TransformInterceptor())
    app.use(helmet())
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    const options = new DocumentBuilder()
        .setTitle('NestJS API Gateway')
        .setDescription(
            'Find here the list of endpoints to communicate with the microservices/APIs'
        )
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)

    await app.listen(3001)
}
bootstrap()
