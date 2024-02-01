declare interface Patient {
    customer: String,
    hospitalName: String,
    hospitalAddress: String,
    hospitalLevel: String,
    createdDate: Date,
    times: Number,
    tags: String,
    cause: String,
    customerId: String,
    depart: String,
    province: String,
    prescriptionDrug: String
}

declare interface userQuery {
    hospitalName: String,
    customerId: String,
    customer: String,
}


declare interface Dictionary {
    provinceName: String,
    code: String,
    doctorNumber: Number,
    mount: Number
}

declare interface Addition {
    hospitalName: String,
    hospitalId: String,
    additionDate: String,
    hospitalLevel: String,
    province: String,
    position: String,
    infoJsonPath: String,
    departJsonPath: String
}

declare interface ProvinceData extends Dictionary {
    children: Array<Addition>
}

declare interface Update {
    fieldCount: Number,
    affectedRows: Number,
    insertId: Number,
    serverStatus: Number,
    warningCount: Number,
    message: String,
    protocol41: boolean,
    changedRows: Number
}

declare interface User {
    username: string,
    password: string,
    avatarPath: string,
    hospitalId: string,
    depart: string,
    author: string,
    userId: string,
    sciencePath: string
}

declare type updateUser = {
    customer: string,
    hospitalName: string,
    hospitalId: string,
    hospitalLevel: string,
    hospitalAddress: string,
    depart: string,
    province: string,
    customerId: string,
    tags: string[] | string,
    prescriptionDrug: string
    picturePath?; string,
    cause: string,
    timer?: number,
    uuid:string
}

declare interface report {
    uuid: string,
    customerId: string,
    hospitalName: string,
    depart: string,
    createdDate: Date,
    tags: String | String[],
    customer: string,
    reportPath:string

}

declare interface getUnloadReport {
    customerId: string,
    customer: string,
    range: [string, string]
}
declare interface comment{
    "index": String,
    "nickname": String,
    "comment": String,
    "commentDate": String
}
declare interface experience {
    "title": string,
    "htmlContent": String,
    "fileName": string,
    "like": number,
    "dislike": number,
    "index": string,
    "comments": comment[]
}
