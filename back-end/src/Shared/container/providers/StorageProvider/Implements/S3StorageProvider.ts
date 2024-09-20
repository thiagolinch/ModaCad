import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "../../../../../Config/upload";

import { IStorageProvider } from "../IStorageProvider";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

class S3StorageProvider implements IStorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);
    const fileContent = await fs.promises.readFile(originalName);
    const contentType = mime.getType(originalName);

    let now = new Date();
    let year = now.getFullYear();
    let month = `${now.getMonth() +1 }`;

    if (month.length === 1) {
      month = `0${month}`;
    }

    const dest = `content/images/${year}/${month}/${folder}/${file}`

    const params = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: dest,
      Body: fileContent,
      ContentType: contentType
    });

    await this.client.send(params)

    const getObjectParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: dest
    }

    const command = new GetObjectCommand(getObjectParams)
 
    const url = await getSignedUrl(this.client, command);

    return url
  };

  async saveAvatar(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);
    const fileContent = await fs.promises.readFile(originalName);
    const contentType = mime.getType(originalName);

    let now = new Date();
    let year = now.getFullYear();
    let month = `${now.getMonth() +1 }`;

    if (month.length === 1) {
      month = `0${month}`;
    }

    const params = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: `content/images/${folder}/${file}`,
      Body: fileContent,
      ContentType: contentType
    });

    await this.client.send(params)

    return file;
  };

  
  async get(image_name: string, folderDest: string): Promise<string> {
    
    const getObjectParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${folderDest}${image_name}`
    }

    const command = new GetObjectCommand(getObjectParams)
 
    const url = await getSignedUrl(this.client, command);

    return url
  };

  async delete(file: string, folder: string): Promise<void> {
    const input = {
      "Bucket": process.env.AWS_BUCKET,
      "Key": `${folder}/${file}`
    }
    const command = new DeleteObjectCommand(input);

    await this.client.send(command)
  };
}

export { S3StorageProvider };