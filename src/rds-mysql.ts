import * as mysql from "mysql";
import mysqldump from 'mysqldump';

const DB_HOST = process.env["DB_HOST"];
const DB_PORT = process.env["DB_PORT"];
const DB_USER = process.env["DB_USER"];
const DB_PASSWORD = process.env["DB_PASSWORD"];
const DB_NAME = process.env["DB_NAME"];
const connectionOptions = {
    host: DB_HOST,
    port: parseInt(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    // debug: true
}

export async function queryMysql(sql: string): Promise<any> {

    let connection = mysql.createConnection(connectionOptions);
    connection.connect();
    console.log(connectionOptions);

    return new Promise((resolve, reject) => {
        connection.query(sql, function (err: any, results: any) {
            if (err) {
                console.error(err);
                connection.end();
                return reject(err);
            } else {
                connection.end();
                return resolve(results);
            }
        })
    });
}

export async function backup(path: string, toCompress: boolean = false): Promise<void> {

    const result = await mysqldump({
        connection: connectionOptions,
        dumpToFile: path,
        compressFile: toCompress
    });
    
    console.log(`saved to path temporary: ${path}`);
    // console.debug(`backup result: ${JSON.stringify(result)}`);

    return;
}