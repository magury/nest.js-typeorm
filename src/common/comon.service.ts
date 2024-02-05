import * as path from "path";

export function isChinese(value: string) {
    const re = /[^\u4E00-\u9FA5]/;
    return !re.test(value);

}
export const Result = (code: Number, result = null) => {
    return {
        code,
        result
    }
}
export function uuid() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;    // d是随机种子
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
    export const originPath='D:\\Colleage\\前端\\my-nest\\typetrm'
export const server='http://localhost:3011'