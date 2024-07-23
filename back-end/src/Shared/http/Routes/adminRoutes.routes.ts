import { Router } from "express"

import { CreateAdmController } from "../../../Modules/Admins/useCases/createAdmUseCase/createAdmController"
import { CreateSessionAdminController } from "../../../Modules/Admins/useCases/authenticate/createSessionAdminController"
import { ensureAuhenticate } from "../middlewares/ensureAuthenticate"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import upload from "../../../Config/upload/upload"
import multer from "multer"
import { UploadAdminAvatarController } from "../../../Modules/Admins/useCases/uploadAdminAvatar/uploadAdminAvatarController"

const adminRoute = Router()

const createAdmController = new CreateAdmController()
const createSessionsAdmController = new CreateSessionAdminController()
const uploadAdminAvatarController = new UploadAdminAvatarController()

const uploadAdminAvatar = multer(upload)

// CREATE ADMIN
adminRoute.post("/", createAdmController.handle)
// CREATE AUTHENTICATION ADMIN
adminRoute.post("/authenticate", createSessionsAdmController.handle);
// DELETE ADMIN
adminRoute.delete("/:id", () => {
    console.log("delete member route working")
})
// UPLOAD ADMIN AVATAR
adminRoute.post("/images/:id", ensureAuhenticate, ensureAdmin, uploadAdminAvatar.array("images"), uploadAdminAvatarController.handle)

export  { adminRoute }