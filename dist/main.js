"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./module/app.module");
const express = require("express");
const node_path_1 = require("node:path");
const cookieParser = require("cookie-parser");
const comon_service_1 = require("./common/comon.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use("/avatar", express.static((0, node_path_1.join)(comon_service_1.originPath, './public/unloads')));
    app.use("/report", express.static((0, node_path_1.join)(comon_service_1.originPath, './public/reported')));
    app.use("/hospital", express.static((0, node_path_1.join)(comon_service_1.originPath, './public/json')));
    app.use(cookieParser());
    await app.listen(3011);
}
bootstrap().then(r => {
    console.log('服务器已开启：http://134.175.81.248:5000');
});
//# sourceMappingURL=main.js.map