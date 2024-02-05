/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
import e from "express";
export declare const multerConfig: {
    limits: {
        fileSize: number;
    };
    fileFilter: (req: e.Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => void;
    storage: import("multer").StorageEngine;
};
export declare const reportConfig: {
    limits: {
        fileSize: number;
    };
    fileFilter: (req: e.Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => void;
    storage: import("multer").StorageEngine;
};
