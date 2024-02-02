import {NestFactory} from '@nestjs/core';
import {AppModule} from './module/app.module';
import * as express from 'express';
import {join} from 'node:path'
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors()//跨域
    // 新增代码，设置静态资源路径与访问前缀
    app.use("/avatar",express.static(join(__dirname,'../','./public/unloads')))
    app.use("/report",express.static(join(__dirname,'../','./public/reported')))
    app.use("/hospital",express.static(join(__dirname,'../','./public/json')))
    // 注册cookie
    app.use(cookieParser());
    await app.listen(3011);

}

bootstrap().then(r =>{
    console.log(__dirname)
    console.log('服务器已开启：http://localhost:3011')
});
