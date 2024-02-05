"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalModule = void 0;
const common_1 = require("@nestjs/common");
const hospital_controller_1 = require("../controller/hospital.controller");
const hospital_service_1 = require("../service/hospital.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../utility/entities/user.entity");
const addition_entity_1 = require("../utility/entities/addition.entity");
const patient_entity_1 = require("../utility/entities/patient.entity");
let HospitalModule = class HospitalModule {
};
exports.HospitalModule = HospitalModule;
exports.HospitalModule = HospitalModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([patient_entity_1.PatientEntity, addition_entity_1.AdditionEntity, user_entity_1.UserEntity])],
        controllers: [hospital_controller_1.HospitalController],
        providers: [hospital_service_1.HospitalService],
        exports: [typeorm_1.TypeOrmModule]
    })
], HospitalModule);
//# sourceMappingURL=hospital.module.js.map