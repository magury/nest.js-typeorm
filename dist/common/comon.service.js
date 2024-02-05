"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.originPath = exports.uuid = exports.Result = exports.isChinese = void 0;
function isChinese(value) {
    const re = /[^\u4E00-\u9FA5]/;
    return !re.test(value);
}
exports.isChinese = isChinese;
const Result = (code, result = null) => {
    return {
        code,
        result
    };
};
exports.Result = Result;
function uuid() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
exports.uuid = uuid;
exports.originPath = 'D:\\Colleage\\前端\\my-nest\\typetrm';
exports.server = 'http://localhost:3011';
//# sourceMappingURL=comon.service.js.map