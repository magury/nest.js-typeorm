"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let reportInterceptor = class reportInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            const statusCode = data.code;
            let message = '';
            switch (statusCode) {
                case 200:
                    message = 'you are successful!';
                    break;
                case 400:
                    message = 'there is a problem with your operation!';
                    break;
                case 500:
                    message = 'Your network is not in good shape, please try again later!';
            }
            return {
                statusCode, message,
                result: data.result
            };
        }));
    }
};
exports.reportInterceptor = reportInterceptor;
exports.reportInterceptor = reportInterceptor = __decorate([
    (0, common_1.Injectable)()
], reportInterceptor);
//# sourceMappingURL=upload.interceptor.js.map