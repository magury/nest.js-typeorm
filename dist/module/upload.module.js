"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("../service/upload.service");
const upload_controller_1 = require("../controller/upload.controller");
const typeorm_1 = require("@nestjs/typeorm");
const report_entity_1 = require("../utility/entities/report.entity");
const user_entity_1 = require("../utility/entities/user.entity");
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([report_entity_1.ReportEntity, user_entity_1.UserEntity])],
        controllers: [upload_controller_1.UploadController],
        providers: [upload_service_1.UploadService],
        exports: [typeorm_1.TypeOrmModule]
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map