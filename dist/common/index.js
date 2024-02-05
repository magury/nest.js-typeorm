"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'suse'
});
function execute(sql, option) {
    return new Promise((resolve, reject) => {
        conn.query(sql, option, (err, result) => {
            if (err) {
                console.log(err.sql);
                reject(err);
            }
            else
                resolve(result);
        });
    });
}
//# sourceMappingURL=index.js.map