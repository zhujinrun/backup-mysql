import * as fs from 'fs';
import * as AWS from "aws-sdk";

const BUCKET_NAME = process.env["BUCKET_NAME"];

const ENV = process.env["ENV"];
if (ENV && ENV === "local") {
    console.log("local");
    AWS.config.region = "cn-northwest-1"
}

export async function upload(filename, path, date) {
    const s3 = new AWS.S3();

    try {
        const result = await s3.upload({
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: fs.createReadStream(path)
        }).promise();
        console.log(`saved to bucket: ${result.Bucket}/${result.Key}`);
    } catch (error) {
        console.error(error);
    }
}