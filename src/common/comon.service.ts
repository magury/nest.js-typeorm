import * as path from "path";

export function isChinese(value: string) {
    const re = /[^\u4E00-\u9FA5]/;
    return !re.test(value);

}

export const LOCAL_URL = 'http://134.175.81.248:5000'
export const SELECT_REPORT = 'select * from report'
export const SELECT_PATIENCE: String = "select * from patience"
export const Result = (code: Number, result = null) => {
    return {
        code,
        result
    }
}
export const LOCALHOST: String = 'http://134.175.81.248:5000'
export const DELETE_REPORT = 'delete  from report'
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