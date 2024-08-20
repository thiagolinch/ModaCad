import multer from "multer"
import crypto from "crypto"
import path, { resolve } from "path"

const tmpFolder = resolve("tmp")

export default {

    storage: multer.diskStorage({
        destination:  tmpFolder,
        filename: (request, file, callBack) => {
            const fileHash = crypto.randomBytes(16).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`

            return callBack(null, fileName)
        }
    })
};