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
exports.ManagerService = void 0;
const common_1 = require("@nestjs/common");
const comon_service_1 = require("../common/comon.service");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../utility/entities/admin.entity");
const typeorm_2 = require("typeorm");
const addition_entity_1 = require("../utility/entities/addition.entity");
const fallback_entity_1 = require("../utility/entities/fallback.entity");
let ManagerService = class ManagerService {
    constructor(managersRepository, additionsRepository, fallbacksRepository) {
        this.managersRepository = managersRepository;
        this.additionsRepository = additionsRepository;
        this.fallbacksRepository = fallbacksRepository;
    }
    async postManager(body) {
        const { address, level, name, province } = body;
        const id = (0, comon_service_1.uuid)();
        const current = new Date().toLocaleString();
        let additions = await this.additionsRepository.findBy({ hospitalName: name });
        if (additions.length > 0)
            return (0, comon_service_1.Result)(400);
        body = {
            hospitalName: name,
            hospitalId: id,
            hospitalLevel: level,
            province,
            position: address,
            additionDate: current,
            infoJsonPath: null
        };
        let update = await this.additionsRepository.insert(body);
        if (update.raw.affectedRows) {
            let res = await this.additionsRepository.find({
                select: ["hospitalId", "hospitalName", "hospitalLevel", "province", "position"]
            });
            return (0, comon_service_1.Result)(200, res);
        }
        return (0, comon_service_1.Result)(400);
    }
    async findManager(query) {
        const res = await this.managersRepository.findOne({ where: query });
        if (res) {
            return (0, comon_service_1.Result)(200, { station: true });
        }
        return (0, comon_service_1.Result)(400, { station: false });
    }
    findOne(id) {
        return `This action returns a #${id} manager`;
    }
    update(id, updateManagerDto) {
        return `This action updates a #${id} manager`;
    }
    remove(id) {
        return `This action removes a #${id} manager`;
    }
};
exports.ManagerService = ManagerService;
exports.ManagerService = ManagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(addition_entity_1.AdditionEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(fallback_entity_1.FallbackEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ManagerService);
//# sourceMappingURL=manager.service.js.map