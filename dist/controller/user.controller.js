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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user.service");
const user_interceptor_1 = require("../utility/interceptor/user.interceptor");
const user_pipes_1 = require("../utility/pipe/user.pipes");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserLogin(query) {
        return this.userService.Login(query);
    }
    async getInfo(query) {
        return await this.userService.getInfo(query);
    }
    getBadList(query) {
        return this.userService.getBadList(query);
    }
    postPatience(body) {
        return this.userService.postPatience(body);
    }
    deleteCustomer(query) {
        return this.userService.deleteCustomer(query);
    }
    postTalking(body) {
        return this.userService.postTalking(body);
    }
    getTalking(type) {
        if (type == 'recommend')
            return this.userService.getRecommend(type);
    }
    postComment(body) {
        return this.userService.postComment(body);
    }
    postDefault(body) {
        return this.userService.postDefault(body);
    }
    getDoctors() {
        return this.userService.getDoctors();
    }
    deleteComments(body) {
        return this.userService.deleteComments(body);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)("/login"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserLogin", null);
__decorate([
    (0, common_1.Get)("/patients"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getInfo", null);
__decorate([
    (0, common_1.Get)("/bad"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getBadList", null);
__decorate([
    (0, common_1.UsePipes)(new user_pipes_1.tagsPipe()),
    (0, common_1.Post)("/update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "postPatience", null);
__decorate([
    (0, common_1.UseInterceptors)(user_interceptor_1.ResponseInterceptor),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.UseInterceptors)(user_interceptor_1.ResponseInterceptor),
    (0, common_1.Post)('/experience'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "postTalking", null);
__decorate([
    (0, common_1.UseInterceptors)(user_interceptor_1.ResponseInterceptor),
    (0, common_1.Get)('/experience'),
    __param(0, (0, common_1.Query)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getTalking", null);
__decorate([
    (0, common_1.UseInterceptors)(user_interceptor_1.ResponseInterceptor),
    (0, common_1.Post)('/comment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "postComment", null);
__decorate([
    (0, common_1.UseInterceptors)(user_interceptor_1.ResponseInterceptor),
    (0, common_1.Post)('/default'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "postDefault", null);
__decorate([
    (0, common_1.UseInterceptors)(user_interceptor_1.ResponseInterceptor),
    (0, common_1.Get)('/doctors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getDoctors", null);
__decorate([
    (0, common_1.UseInterceptors)(user_interceptor_1.ResponseInterceptor),
    (0, common_1.Delete)('comments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteComments", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map