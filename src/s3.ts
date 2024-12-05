import * as fs from 'fs';

import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";

const BUCKET_NAME = process.env.BUCKET_NAME;

export async function upload(filename, path, date) {
  const s3 = new S3({
    region: "us-east-1"
  });
  try {
    const result = await new Upload({
      client: s3,

      params: {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: fs.createReadStream(path)
      }
    }).done();
    console.log(`saved to bucket: ${result.Bucket}/${result.Key}`);
  } catch (error) {
    console.error(error);
  }
}