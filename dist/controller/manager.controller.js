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
exports.ManagerController = void 0;
const common_1 = require("@nestjs/common");
const manager_service_1 = require("../service/manager.service");
const update_manager_dto_1 = require("../dto/manager.dto/update-manager.dto");
const user_interceptor_1 = require("../utility/interceptor/user.interceptor");
let ManagerController = class ManagerController {
    constructor(managerService) {
        this.managerService = managerService;
    }
    postManager(body) {
        return this.managerService.postManager(body);
    }
    findManager(query) {
        return this.managerService.findManager(query);
    }
    findOne(id) {
        return this.managerService.findOne(+id);
    }
    update(id, updateManagerDto) {
        return this.managerService.update(+id, updateManagerDto);
    }
    remove(id) {
        return this.managerService.remove(+id);
    }
};
exports.ManagerController = ManagerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "postManager", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "findManager", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_manager_dto_1.UpdateManagerDto]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "remove", null);
exports.ManagerController = ManagerController = __decorate([
    (0, common_1.UseInterceptors)(user_interceptor_1.ResponseInterceptor),
    (0, common_1.Controller)('manager'),
    __metadata("design:paramtypes", [manager_service_1.ManagerService])
], ManagerController);
//# sourceMappingURL=manager.controller.js.map