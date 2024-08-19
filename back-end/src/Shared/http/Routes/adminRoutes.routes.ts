import { Router } from "express"

import { CreateAdmController } from "../../../Modules/Admins/useCases/createAdmUseCase/createAdmController"
import { AdminProfileController } from "../../../Modules/Admins/useCases/profileAdmin/profileAdminController"

import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate"

import upload from "../../../Config/upload/upload"
import multer from "multer"
import { ListMembersController } from "../../../Modules/Members/useCases/listMembers/listMembersController"

const adminRoute = Router()

const createAdmController = new CreateAdmController()
const profileAdminController = new AdminProfileController()
const listMembers = new ListMembersController();

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

// LIST MEMBERS
adminRoute.get("/members", ensureAdminAuhenticate, listMembers.handle)

export  { adminRoute };