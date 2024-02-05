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
exports.ReportEntity = void 0;
const typeorm_1 = require("typeorm");
let ReportEntity = class ReportEntity {
};
exports.ReportEntity = ReportEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ReportEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReportEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReportEntity.prototype, "hospitalName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReportEntity.prototype, "depart", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReportEntity.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReportEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReportEntity.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReportEntity.prototype, "reportPath", void 0);
exports.ReportEntity = ReportEntity = __decorate([
    (0, typeorm_1.Entity)('report')
], ReportEntity);
//# sourceMappingURL=report.entity.js.map