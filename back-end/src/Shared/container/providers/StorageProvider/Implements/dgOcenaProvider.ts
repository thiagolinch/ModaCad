import { S3 } from "aws-sdk"
import { resolve } from "path"
import mime from "mime"
import fs from "fs"

import upload from "../../../../../Config/upload/upload";

import { IStorageProvider } from "../IStorageProvider";

class DgOceantorageProvider implements IStorageProvider {

  async save(file: string, folder: string): Promise<string> {
      await fs.promises.rename(
          resolve(upload.tmpFolder, file),
          resolve(`${upload.tmpFolder}/${folder}`, file)
      );

      return file;
  }
  async delete(file: string, folder: string): Promise<void> {
      const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

      try {
          await fs.promises.stat(filename);
      } catch {
          return;
      }
  }

}

export { DgOceantorageProvider };