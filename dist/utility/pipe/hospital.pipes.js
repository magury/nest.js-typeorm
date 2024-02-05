"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicJsonPipes = void 0;
const common_1 = require("@nestjs/common");
let publicJsonPipes = class publicJsonPipes {
    transform(value, metadata) {
        let { onlyKey } = value;
        onlyKey = onlyKey.split('_');
        value['fileName'] = onlyKey[0];
        return value;
    }
};
exports.publicJsonPipes = publicJsonPipes;
exports.publicJsonPipes = publicJsonPipes = __decorate([
    (0, common_1.Injectable)()
], publicJsonPipes);
//# sourceMappingURL=hospital.pipes.js.map