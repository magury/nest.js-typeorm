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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const comon_service_1 = require("../common/comon.service");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../utility/entities/user.entity");
const addition_entity_1 = require("../utility/entities/addition.entity");
const patient_entity_1 = require("../utility/entities/patient.entity");
const report_entity_1 = require("../utility/entities/report.entity");
let UserService = class UserService {
    constructor(usersRepository, additionsRepository, patienceRepository, reportsRepository) {
        this.usersRepository = usersRepository;
        this.additionsRepository = additionsRepository;
        this.patienceRepository = patienceRepository;
        this.reportsRepository = reportsRepository;
    }
    async getInfo(query) {
        for (let item in query)
            query[item] = `%${query[item]}%`;
        const res = await this.patienceRepository.findBy({
            hospitalName: (0, typeorm_2.Like)(query.hospitalName),
            customerId: (0, typeorm_2.Like)(query.customerId),
            customer: (0, typeorm_2.Like)(query.customer)
        });
        return {
            statusCode: 200,
            result: res
        };
    }
    async getBadList(query) {
        for (let item in query)
            query[item] = `%${query[item]}%`;
        const res = await this.patienceRepository.find({
            where: {
                cause: (0, typeorm_2.Not)(''),
                hospitalName: (0, typeorm_2.Like)(query.hospitalName),
                customerId: (0, typeorm_2.Like)(query.customerId),
                customer: (0, typeorm_2.Like)(query.customer)
            }
        });
        return {
            statusCode: 200,
            result: res
        };
    }
    async Login(query) {
        let { username, password, hospital: { key: hospitalId } } = query;
        const user = await this.usersRepository.findOne({ where: { username, password, hospitalId } });
        if (user) {
            const hospital = await this.additionsRepository.findOneBy({ hospitalId });
            return {
                statusCode: 200,
                result: {
                    avatarPath: user.avatarPath,
                    hospitalId: user.hospitalId,
                    depart: user.depart,
                    hospitalName: hospital.hospitalName,
                    hospitalLevel: hospital.hospitalLevel,
                    province: hospital.province,
                    position: hospital.position,
                    userId: user.userId,
                    author: user.author
                }
            };
        }
        else
            return (0, comon_service_1.Result)(400);
    }
    async postPatience(body) {
        body.uuid = (0, comon_service_1.uuid)();
        const insert = await this.patienceRepository.insert(body);
        if (insert.raw.affectedRows) {
            return {
                statusCode: 200,
                result: await this.patienceRepository.findBy({ hospitalName: body.hospitalName })
            };
        }
        return (0, comon_service_1.Result)(400);
    }
    async deleteCustomer(query) {
        return {
            statusCode: 200,
            result: await this.patienceRepository.delete(query)
        };
    }
    async postTalking(body) {
        const res = await (0, promises_1.readdir)((0, path_1.join)(comon_service_1.originPath, 'public/experience'));
        const { length } = res;
        const previous = (length - 1).toString().padStart(4, '0');
        const current = length.toString().padStart(4, '0');
        const data = {
            title: body.title,
            htmlContent: body.htmlContent,
            like: 0, dislike: 0, index: "0", comments: []
        };
        if (res.length == 0) {
            data.fileName = `exp${previous}.json`;
            await (0, promises_1.writeFile)((0, path_1.join)(comon_service_1.originPath, `public/experience/exp${previous}.json`), JSON.stringify([data]));
        }
        else {
            const { size } = await (0, promises_1.stat)((0, path_1.join)(comon_service_1.originPath, 'public/experience', res[length - 1]));
            if (size > 10000000) {
                data.fileName = `exp${current}.json`;
                await (0, promises_1.writeFile)((0, path_1.join)(comon_service_1.originPath, `public/experience/exp${current}.json`), JSON.stringify([data]));
            }
            else {
                const result = JSON.parse(await (0, promises_1.readFile)((0, path_1.join)(comon_service_1.originPath, `public/experience/exp${previous}.json`), 'utf-8'));
                data.fileName = `exp${previous}.json`;
                data.index = result.length.toString();
                result[result.length] = data;
                await (0, promises_1.writeFile)((0, path_1.join)(comon_service_1.originPath, `public/experience/exp${previous}.json`), JSON.stringify(result));
            }
        }
        return (0, comon_service_1.Result)(200);
    }
    async getRecommend(recommend) {
        const files = await (0, promises_1.readdir)((0, path_1.join)(comon_service_1.originPath, 'public', 'experience'));
        let result = [];
        for (let file of files) {
            let chats = JSON.parse(await (0, promises_1.readFile)((0, path_1.join)(comon_service_1.originPath, 'public', 'experience', file), 'utf-8'));
            for (let chat of chats) {
                result.push(chat);
            }
        }
        return (0, comon_service_1.Result)(200, result);
    }
    async postComment(body) {
        const { fileName, index } = body;
        const json = JSON.parse(await (0, promises_1.readFile)((0, path_1.join)(comon_service_1.originPath, 'public', 'experience', fileName), 'utf-8'));
        json[index].like = body.like;
        json[index].dislike = body.dislike;
        json[index].comments = body.comments;
        await (0, promises_1.writeFile)((0, path_1.join)(comon_service_1.originPath, 'public', 'experience', fileName), JSON.stringify(json));
        return (0, comon_service_1.Result)(200);
    }
    async postDefault({ author, depart, password, hospital: { value: hospitalName, level: hospitalId }, username }) {
        let infos = await this.additionsRepository.findOne({ where: { hospitalName: hospitalName } });
        if (!infos)
            return (0, comon_service_1.Result)(400, { error: '该医院不存在' });
        let user = await this.usersRepository.findOne({ where: { username, hospitalId } });
        if (user) {
            return (0, comon_service_1.Result)(400, { err: `该账号在${hospitalName}已经被注册过了，请更改账号` });
        }
        else {
            let userId = (0, comon_service_1.uuid)();
            let update = await this.usersRepository.insert({
                username, password, userId,
                avatarPath: null,
                depart, author,
                sciencePath: `${comon_service_1.server}/hospital/${userId}.json`,
                hospitalId
            });
            if (update.raw.affectedRows) {
                let res = await this.usersRepository.query(`select a.hospitalName,b.* from addition a,user b 
                        where a.hospitalId=b.hospitalId`);
                return (0, comon_service_1.Result)(200, res);
            }
            else {
                return (0, comon_service_1.Result)(500, { err: '网络繁忙，请稍后重试' });
            }
        }
    }
    async getDoctors() {
        let res = await this.usersRepository
            .query('select a.*,b.hospitalName from user a,addition b ' +
            'where a.hospitalId=b.hospitalId');
        return (0, comon_service_1.Result)(200, res);
    }
    async deleteComments({ fileName, index }) {
        const json = JSON.parse(await (0, promises_1.readFile)((0, path_1.join)(comon_service_1.originPath, `public/experience/${fileName}`), 'utf-8'));
        const res = json.filter((item) => item.index != index);
        await (0, promises_1.writeFile)((0, path_1.join)(comon_service_1.originPath, `public/experience/${fileName}`), JSON.stringify(res));
        return (0, comon_service_1.Result)(200);
    }
};
exports.UserService = UserService;
__decorate([
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getInfo", null);
__decorate([
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getBadList", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(addition_entity_1.AdditionEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(patient_entity_1.PatientEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(report_entity_1.ReportEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map