"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalController = void 0;
const common_1 = require("@nestjs/common");
const hospital_interceptor_1 = require("../utility/interceptor/hospital.interceptor");
const hospital_service_1 = require("../service/hospital.service");
const hospital_pipes_1 = require("../utility/pipe/hospital.pipes");
const hospital_HttpExceptionFilter_1 = require("../utility/exception/hospital.HttpExceptionFilter");
let HospitalController = class HospitalController {
    constructor(hospitalService) {
        this.hospitalService = hospitalService;
    }
    getHospitalList(hospital) {
        return this.hospitalService.getHospitalList(hospital);
    }
    getProvince() {
        return this.hospitalService.getProvince();
    }
    getJson(hospitalName) {
        return this.hospitalService.getJson(hospitalName);
    }
    getPopularJson() {
        return this.hospitalService.getPopularJson();
    }
    putPublicJson(body) {
        return this.hospitalService.putPublicJson(body);
    }
    putTopicContent(userId, topic, description, content) {
        return this.hospitalService.putTopicContent(userId, topic, description, content);
    }
    postContent(body) {
        return this.hospitalService.postContent(body);
    }
    getAll() {
        return this.hospitalService.getAll();
    }
    deleteById(id) {
        return this.hospitalService.deleteById(id);
    }
    deleteJson(body) {
        return this.hospitalService.deleteJson(body);
    }
    getHospitals() {
        return this.hospitalService.getHospitals();
    }
};
exports.HospitalController = HospitalController;
__decorate([
    (0, common_1.Get)("list"),
    __param(0, (0, common_1.Query)("hospital")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "getHospitalList", null);
__decorate([
    (0, common_1.Get)('/province'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "getProvince", null);
__decorate([
    (0, common_1.Get)("/json"),
    __param(0, (0, common_1.Query)("hospitalName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "getJson", null);
__decorate([
    (0, common_1.Get)("/popular"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "getPopularJson", null);
__decorate([
    (0, common_1.UsePipes)(new hospital_pipes_1.publicJsonPipes()),
    (0, common_1.Put)("/json"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "putPublicJson", null);
__decorate([
    (0, common_1.UseFilters)(new hospital_HttpExceptionFilter_1.HttpExceptionFilter()),
    (0, common_1.Put)('content'),
    __param(0, (0, common_1.Body)("userId")),
    __param(1, (0, common_1.Body)("topic")),
    __param(2, (0, common_1.Body)("description")),
    __param(3, (0, common_1.Body)("content")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "putTopicContent", null);
__decorate([
    (0, common_1.UseFilters)(new hospital_HttpExceptionFilter_1.HttpExceptionFilter()),
    (0, common_1.Post)('content'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "postContent", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)('/:key'),
    __param(0, (0, common_1.Param)("key")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Post)('/essays'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "deleteJson", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HospitalController.prototype, "getHospitals", null);
exports.HospitalController = HospitalController = __decorate([
    (0, common_1.UseInterceptors)(hospital_interceptor_1.HospitalInterceptor),
    (0, common_1.Controller)("hospitals"),
    __metadata("design:paramtypes", [hospital_service_1.HospitalService])
], HospitalController);
//# sourceMappingURL=hospital.controller.js.map