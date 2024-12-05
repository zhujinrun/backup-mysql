import * as fs from 'fs';
import * as rdsHelper from "./rds";
import * as s3Helper from './s3';

const backupFolder = (process.env.ENV === "local") ? "./backup" : "/tmp"
const compressSql = (process.env.COMPRESS === "true") ? true : false;
const DB_NAME = process.env.DB_NAME;

export async function handler(event: any, context: any): Promise<void> {
  console.log("mysql backup lambda triggered!");

  if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder);
  }

  const now = new Date();
  const dateString = now.toJSON().substring(0, 16).replace(":", "");
  const filename = compressSql ? `${DB_NAME}-${dateString}.sql.gz` : `${DB_NAME}-${dateString}.sql`;
  const path = `${backupFolder}/${filename}`;

  await rdsHelper.backup(path, compressSql);

  await s3Helper.upload(filename, path, now);

  // remove tmp file
  if (process.env.DEBUG !== "true") {
    fs.unlinkSync(path);
  }
  console.log("backup and upload done!");
  return;
}