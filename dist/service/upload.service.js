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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const comon_service_1 = require("../common/comon.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_entity_1 = require("../utility/entities/report.entity");
const user_entity_1 = require("../utility/entities/user.entity");
let UploadService = class UploadService {
    constructor(reportsRepository, usersRepository) {
        this.reportsRepository = reportsRepository;
        this.usersRepository = usersRepository;
    }
    async create(file, query) {
        if (file) {
            const url = `${comon_service_1.server}/avatar/${file.filename}`;
            const res = await this.usersRepository.update({
                username: query.username,
                password: query.password
            }, {
                avatarPath: url
            });
            if (res.affected)
                return (0, comon_service_1.Result)(200, { url });
            else {
                return (0, comon_service_1.Result)(500, { errors: '请稍后上传' });
            }
        }
        return {
            statusCode: 400
        };
    }
    async postReport(file, body) {
        const reportPath = file.filename;
        body.uuid = (0, comon_service_1.uuid)();
        body.reportPath = reportPath;
        await this.reportsRepository.save(body);
        const result = await this.reportsRepository.findBy({ hospitalName: body.hospitalName });
        result.map((item, index) => {
            item.tags = JSON.parse(item.tags);
        });
        return (0, comon_service_1.Result)(200, result);
    }
    async getReport(query) {
        const result = await this.reportsRepository.findBy({
            customer: (0, typeorm_2.Like)(`%${query.customer}%`),
            customerId: (0, typeorm_2.Like)(`%${query.customerId}%`),
            createdDate: (0, typeorm_2.Between)(query.range[0], query.range[1])
        });
        result.map((item) => {
            item.tags = JSON.parse(item.tags);
        });
        return (0, comon_service_1.Result)(200, result);
    }
    putReport(file) {
        const result = {
            url: `${comon_service_1.server}/report/${file.originalname}`
        };
        return (0, comon_service_1.Result)(200, result);
    }
    async deleteReport(uuid) {
        return (0, comon_service_1.Result)(200, await this.reportsRepository.delete({ uuid }));
    }
    async getParamReport(hospitalName) {
        const res = await this.reportsRepository.findBy({
            hospitalName
        });
        return (0, comon_service_1.Result)(200, res);
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.ReportEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UploadService);
//# sourceMappingURL=upload.service.js.map