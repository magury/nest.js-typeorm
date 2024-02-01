import {extname} from 'path';
import {diskStorage} from 'multer';
import e from "express";
import * as path from "path";

export const multerConfig = {
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req: e.Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
        //中文乱码
        file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8"
        );
        // 限制上传图片类型文件
        if (file.mimetype.match(/(jpg|jpeg|png|gif)$/)) {
            return callback(null, true);
        }

        return callback(null, false);
    },
    storage: diskStorage({
        destination: path.join(__dirname, '../', './public/unloads'),
        filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
            return callback(null, `${file.originalname}`)
        }
    })
};
export const reportConfig = {
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req: e.Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
        //中文乱码
        file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8"
        );
        // 限制上传图片类型文件
        if (file.mimetype.match(/(jpg|jpeg|png|gif)$/)) {
            return callback(null, true);
        }

        return callback(null, false);
    },
    storage: diskStorage({
        destination: path.join(__dirname, '../', './public/reported'),
        filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
            return callback(null, `${file.originalname}`)
        }
    })
};