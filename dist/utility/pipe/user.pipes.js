"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsPipe = void 0;
const common_1 = require("@nestjs/common");
const comon_service_1 = require("../../common/comon.service");
let tagsPipe = class tagsPipe {
    transform(value, metadata) {
        delete value.hospitalId;
        delete value.picturePath;
        value.createdDate = new Date().toLocaleString();
        const tags = value.tags;
        let values = [""];
        for (let tag of tags)
            if ((0, comon_service_1.isChinese)(tag))
                values[values.length - 1] += tag;
            else
                values[values.length] = "";
        value.tags = JSON.stringify(values);
        return value;
    }
};
exports.tagsPipe = tagsPipe;
exports.tagsPipe = tagsPipe = __decorate([
    (0, common_1.Injectable)()
], tagsPipe);
//# sourceMappingURL=user.pipes.js.map