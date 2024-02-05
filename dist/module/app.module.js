"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("../controller/app.controller");
const app_service_1 = require("../service/app.service");
const user_module_1 = require("./user.module");
const upload_module_1 = require("./upload.module");
const upload_controller_1 = require("../controller/upload.controller");
const upload_service_1 = require("../service/upload.service");
const hospital_module_1 = require("./hospital.module");
const hospital_controller_1 = require("../controller/hospital.controller");
const hospital_service_1 = require("../service/hospital.service");
const doctor_module_1 = require("./doctor.module");
const doctor_controller_1 = require("../controller/doctor.controller");
const doctor_service_1 = require("../service/doctor.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const manager_module_1 = require("./manager.module");
let AppModule = class AppModule {
    configure(consumer) {
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Dependencies)(typeorm_2.DataSource),
    (0, common_1.Module)({
        imports: [upload_module_1.UploadModule, user_module_1.UserModule, hospital_module_1.HospitalModule, doctor_module_1.DoctorModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '1234',
                database: 'suse',
                autoLoadEntities: true,
            }),
            manager_module_1.ManagerModule,
        ],
        controllers: [app_controller_1.AppController, upload_controller_1.UploadController, hospital_controller_1.HospitalController, doctor_controller_1.DoctorController],
        providers: [app_service_1.AppService, upload_service_1.UploadService, hospital_service_1.HospitalService, doctor_service_1.DoctorService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map