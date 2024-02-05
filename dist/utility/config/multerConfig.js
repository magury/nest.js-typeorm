"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportConfig = exports.multerConfig = void 0;
const multer_1 = require("multer");
const path = require("path");
const comon_service_1 = require("../../common/comon.service");
exports.multerConfig = {
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, callback) => {
        file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
        if (file.mimetype.match(/(jpg|jpeg|png|gif)$/)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    storage: (0, multer_1.diskStorage)({
        destination: path.join(comon_service_1.originPath, './public/unloads'),
        filename(req, file, callback) {
            return callback(null, `${file.originalname}`);
        }
    })
};
exports.reportConfig = {
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, callback) => {
        file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
        if (file.mimetype.match(/(jpg|jpeg|png|gif)$/)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    storage: (0, multer_1.diskStorage)({
        destination: path.join(comon_service_1.originPath, './public/reported'),
        filename(req, file, callback) {
            return callback(null, `${file.originalname}`);
        }
    })
};
//# sourceMappingURL=multerConfig.js.map