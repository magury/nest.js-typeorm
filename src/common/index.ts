import {MysqlError} from "mysql";

import * as mysql from "mysql";

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'suse'
})

export function execute<T>(sql: string, option?: any): Promise<T> {
    return new Promise((resolve, reject) => {
        conn.query(sql, option, (err, result) => {
            if (err) {
                console.log(err.sql)
                reject(err)
            } else
                resolve(result)


        })
    })
}