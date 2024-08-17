import { Router } from "express"

import { CreateAdmController } from "../../../Modules/Admins/useCases/createAdmUseCase/createAdmController"
import { AdminProfileController } from "../../../Modules/Admins/useCases/profileAdmin/profileAdminController"

import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate"

import upload from "../../../Config/upload/upload"
import multer from "multer"

const adminRoute = Router()

const createAdmController = new CreateAdmController()
const profileAdminController = new AdminProfileController()

const uploadAdminAvatar = multer(upload)

// CREATE ADMIN
adminRoute.post("/", createAdmController.handle)
// DELETE ADMIN
adminRoute.delete("/:id", () => {
    console.log("delete member route working")
})
// ADMIN PROFILE
adminRoute.get("/profile", ensureAdminAuhenticate, profileAdminController.handle)

// UPLOAD ADMIN AVATAR


export  { adminRoute };