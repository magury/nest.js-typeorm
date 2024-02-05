"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("../controller/user.controller");
const user_service_1 = require("../service/user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../utility/entities/user.entity");
const addition_entity_1 = require("../utility/entities/addition.entity");
const patient_entity_1 = require("../utility/entities/patient.entity");
const report_entity_1 = require("../utility/entities/report.entity");
const admin_entity_1 = require("../utility/entities/admin.entity");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, addition_entity_1.AdditionEntity, patient_entity_1.PatientEntity, report_entity_1.ReportEntity, admin_entity_1.AdminEntity])],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [typeorm_1.TypeOrmModule]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map