import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "../../../../../Config/upload";

import { IStorageProvider } from "../IStorageProvider";

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
 
    // https://d3azcaa09e3xht.cloudfront.net/content/images/2024/09/images/IMG_5326.JPG  (EXEMPLO)
    const url = `https://d3azcaa09e3xht.cloudfront.net/${dest}`;

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

    const dest = `content/images/${folder}/${file}`

    const params = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: dest,
      Body: fileContent,
      ContentType: contentType
    });

    await this.client.send(params)

    const url = `https://d3azcaa09e3xht.cloudfront.net/${dest}`;    

    return file;
  };

  
  async get(image_name: string, folderDest: string): Promise<string> {
    
    const getObjectParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${folderDest}${image_name}`
    }

    // https://d3azcaa09e3xht.cloudfront.net/content/images/2024/09/images/IMG_5326.JPG  (EXEMPLO)
    const url = `https://d3azcaa09e3xht.cloudfront.net/${folderDest}${image_name}`;

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