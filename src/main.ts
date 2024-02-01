import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as express from 'express';
import {join} from 'node:path'
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors()//跨域
    // 新增代码，设置静态资源路径与访问前缀
    app.use("/avatar",express.static(join('./public/unloads')))
    app.use("/report",express.static(join('./public/reported')))
    app.use("/hospital",express.static(join('./public/json')))
    // 注册cookie
    app.use(cookieParser());
    await app.listen(3011);

}

bootstrap().then(r => console.log('服务器已开启：http://localhost:3011'));
