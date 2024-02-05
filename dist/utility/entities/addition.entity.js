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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionEntity = void 0;
const typeorm_1 = require("typeorm");
let AdditionEntity = class AdditionEntity {
};
exports.AdditionEntity = AdditionEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdditionEntity.prototype, "hospitalName", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], AdditionEntity.prototype, "hospitalId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdditionEntity.prototype, "additionDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdditionEntity.prototype, "hospitalLevel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdditionEntity.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdditionEntity.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdditionEntity.prototype, "infoJsonPath", void 0);
exports.AdditionEntity = AdditionEntity = __decorate([
    (0, typeorm_1.Entity)("addition")
], AdditionEntity);
//# sourceMappingURL=addition.entity.js.map