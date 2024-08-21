import multer from "multer"
import crypto from "crypto"
import path, { resolve } from "path"

let now = new Date();
let year = now.getFullYear();
let month = `${now.getMonth() +1 }`;

if (month.length === 1) {
    month = `0${month}`;
}

const tmpFolder = resolve(`tmp/content/images/${year}/${month}`)

export default {
    tmpFolder,

    storage: multer.diskStorage({
        destination:  tmpFolder,
        filename: (request, file, callBack) => {
            const fileHash = crypto.randomBytes(16).toString("hex");
            const fileName = `${file.originalname}`

            return callBack(null, fileName)
        }
    })
}