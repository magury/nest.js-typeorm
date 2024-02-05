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
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const comon_service_1 = require("../common/comon.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../utility/entities/user.entity");
const typeorm_2 = require("typeorm");
const fallback_entity_1 = require("../utility/entities/fallback.entity");
const addition_entity_1 = require("../utility/entities/addition.entity");
let DoctorService = class DoctorService {
    constructor(usersRepository, fallbacksRepository, additionsRepository) {
        this.usersRepository = usersRepository;
        this.fallbacksRepository = fallbacksRepository;
        this.additionsRepository = additionsRepository;
    }
    async post_fallback({ userId, hospitalId, errors }) {
        let update = await this.fallbacksRepository.insert({ hospitalId, dealStatus: 0, errors, userId, uuid: (0, comon_service_1.uuid)() });
        if (update) {
            return (0, comon_service_1.Result)(200);
        }
        else {
            return (0, comon_service_1.Result)(500, { error: '网络繁忙，请稍后重试' });
        }
    }
    async get_fallback() {
        let sql = await this.fallbacksRepository
            .query('select a.*,b.author,c.hospitalName ' +
            'from fallback as a,user as b,addition as c ' +
            'where a.userId=b.userId and a.hospitalId=b.hospitalId and b.hospitalId=c.hospitalId');
        return (0, comon_service_1.Result)(200, sql);
    }
    async put_fallback({ userId, hospitalId, uuid }) {
        let update = await this.fallbacksRepository.update({ hospitalId, uuid }, { dealStatus: 1 });
        if (update.affected)
            return (0, comon_service_1.Result)(200);
        return (0, comon_service_1.Result)(500);
    }
    async deleteDoctors(body) {
        const { hospitalId, username } = body;
        const update = await this.usersRepository.delete({ username, hospitalId });
        if (update.affected) {
            const users = await this.usersRepository.find();
            return (0, comon_service_1.Result)(200, users);
        }
        else {
            return (0, comon_service_1.Result)(500, { err: '网络繁忙，请稍后重试' });
        }
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(fallback_entity_1.FallbackEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(addition_entity_1.AdditionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map