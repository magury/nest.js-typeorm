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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("../service/upload.service");
const platform_express_1 = require("@nestjs/platform-express");
const multerConfig_1 = require("../utility/config/multerConfig");
const unload_pipe_1 = require("../utility/pipe/unload.pipe");
const upload_interceptor_1 = require("../utility/interceptor/upload.interceptor");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    simple(file, query) {
        return this.uploadService.create(file, query);
    }
    postReport(file, body) {
        return this.uploadService.postReport(file, body);
    }
    putReport(file, body) {
        return this.uploadService.putReport(file);
    }
    getReport(query) {
        return this.uploadService.getReport(query);
    }
    getParamReport(hospitalName) {
        return this.uploadService.getParamReport(hospitalName);
    }
    deleteReport(uuid) {
        return this.uploadService.deleteReport(uuid);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multerConfig_1.multerConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "simple", null);
__decorate([
    (0, common_1.UsePipes)(new unload_pipe_1.reportPipe()),
    (0, common_1.Post)("/report"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multerConfig_1.reportConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "postReport", null);
__decorate([
    (0, common_1.Put)("/report"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multerConfig_1.reportConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "putReport", null);
__decorate([
    (0, common_1.Get)("/report"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "getReport", null);
__decorate([
    (0, common_1.Get)('/:hospitalName'),
    __param(0, (0, common_1.Param)("hospitalName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "getParamReport", null);
__decorate([
    (0, common_1.Delete)('/report'),
    __param(0, (0, common_1.Body)("uuid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "deleteReport", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.UseInterceptors)(upload_interceptor_1.reportInterceptor),
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map