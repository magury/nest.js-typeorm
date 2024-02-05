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
exports.HospitalService = void 0;
const common_1 = require("@nestjs/common");
const comon_service_1 = require("../common/comon.service");
const fs = require("fs");
const promises_1 = require("fs/promises");
const ts_jest_1 = require("ts-jest");
const typeorm_1 = require("@nestjs/typeorm");
const patient_entity_1 = require("../utility/entities/patient.entity");
const typeorm_2 = require("typeorm");
const addition_entity_1 = require("../utility/entities/addition.entity");
const user_entity_1 = require("../utility/entities/user.entity");
const path_1 = require("path");
let HospitalService = class HospitalService {
    constructor(patienceRepository, additionsRepository, usersRepository) {
        this.patienceRepository = patienceRepository;
        this.additionsRepository = additionsRepository;
        this.usersRepository = usersRepository;
    }
    async getHospitalList(hospitalName) {
        const res = await this.additionsRepository.findBy({
            hospitalName: (0, typeorm_2.Like)(`%${hospitalName}%`)
        });
        res.map((item) => {
            item.infoJsonPath = `${comon_service_1.server}/hospital/${item.infoJsonPath}`;
        });
        return (0, comon_service_1.Result)(200, res);
    }
    async getJson(hospitalName) {
        if (hospitalName) {
            let result = await this.additionsRepository.findBy({ hospitalName });
            return (0, comon_service_1.Result)(200, result);
        }
        let result = await this.additionsRepository.query('select a.hospitalName,b.* from addition as a,user as b  where a.hospitalId=b.hospitalId');
        return (0, comon_service_1.Result)(200, result);
    }
    async getPopularJson() {
        let result = await this.usersRepository.find({
            select: ["sciencePath"],
            where: {
                sciencePath: (0, typeorm_2.Not)('')
            }
        });
        let res = result.map((item) => item.sciencePath);
        return (0, comon_service_1.Result)(200, res);
    }
    async putPublicJson(body) {
        const { onlyKey } = body;
        if (onlyKey == "")
            return (0, comon_service_1.Result)(200, null);
        let unique = await (0, promises_1.readFile)((0, path_1.join)(comon_service_1.originPath, 'public', 'json', `${body['fileName']}.json`));
        for (let i = 0; i < unique.length; i++) {
            for (let j = 0; j < body['data'].length; j++) {
                if (unique[i]['onlyKey'] == body['data'][j]['onlyKey'])
                    unique[i] = body['data'][j];
            }
        }
        let data = JSON.stringify(unique, undefined, 4);
        await (0, promises_1.writeFile)((0, path_1.join)(comon_service_1.originPath, `public/json/${body['fileName']}.json`), data);
        return (0, comon_service_1.Result)(200, null);
    }
    async putTopicContent(userId, title, description, paragraph) {
        let user = await this.usersRepository.findOne({ where: { userId } });
        if (!fs.existsSync((0, path_1.join)(comon_service_1.originPath, `public/json/${userId}.json`))) {
            fs.writeFileSync((0, path_1.join)(comon_service_1.originPath, `public/json/${userId}.json`), '[]');
        }
        const unique = JSON.parse(await (0, promises_1.readFile)((0, path_1.join)(comon_service_1.originPath, `public/json/${userId}.json`), 'utf-8'));
        const current = new Date();
        unique.push({
            onlyKey: `${userId}_${(unique.length + 1).toString().padStart(4, '0')}`,
            avatarPath: user.avatarPath,
            author: user.author,
            title: title,
            description: description,
            descriptionPath: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            publicDate: `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`,
            like: 0, dislike: 0, paragraph: paragraph.split(/\r\n|\n\r|[\n\r]/), comment: []
        });
        await (0, promises_1.writeFile)((0, path_1.join)(comon_service_1.originPath, `public/json/${userId}.json`), JSON.stringify(unique));
        return (0, comon_service_1.Result)(200, {
            path: `${comon_service_1.server}/hospital/${userId}.json`
        });
    }
    async getAll() {
        const res = await this.additionsRepository.find({
            select: ["hospitalId", "hospitalName", "hospitalLevel", "province", "position"]
        });
        return (0, comon_service_1.Result)(200, res);
    }
    async deleteById(id) {
        const update = await this.additionsRepository.delete({ hospitalId: id });
        if (update.affected) {
            const hospitals = await this.additionsRepository.find();
            return (0, comon_service_1.Result)(200, hospitals);
        }
    }
    async deleteJson(body) {
        const { userId, onlyKey } = body;
        const json = JSON.parse(await (0, promises_1.readFile)((0, path_1.join)(comon_service_1.originPath, `public/json/${userId}.json`), 'utf-8'));
        const data = json.filter((item) => item.onlyKey != onlyKey);
        await (0, promises_1.writeFile)((0, path_1.join)(comon_service_1.originPath, `public/json/${userId}.json`), JSON.stringify(data));
        return (0, comon_service_1.Result)(200);
    }
    async postContent({ onlyKey, nickname, comment }) {
        const fileName = onlyKey.split('_')[0];
        const jsons = JSON.parse(await (0, promises_1.readFile)((0, path_1.join)(comon_service_1.originPath, `public/json/${fileName}.json`), 'utf-8'));
        const date = new Date();
        for (let json of jsons) {
            if (json.onlyKey == onlyKey) {
                json.comments.push({
                    index: (0, ts_jest_1.stringify)(json.comments.length),
                    nickname, comment,
                    commentDate: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
                });
                await (0, promises_1.writeFile)((0, path_1.join)(comon_service_1.originPath, `public/json/${fileName}.json`), JSON.stringify(jsons));
                return (0, comon_service_1.Result)(200, json.comments);
            }
        }
        return (0, comon_service_1.Result)(400);
    }
    async getProvince() {
        let res = await this.additionsRepository.find({
            select: ["province"]
        });
        return (0, comon_service_1.Result)(200, res.map((item) => (item.province)));
    }
    async getHospitals() {
        const res = await this.additionsRepository.find({
            select: ["hospitalName", "hospitalId"]
        });
        return (0, comon_service_1.Result)(200, res);
    }
};
exports.HospitalService = HospitalService;
exports.HospitalService = HospitalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.PatientEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(addition_entity_1.AdditionEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HospitalService);
//# sourceMappingURL=hospital.service.js.map