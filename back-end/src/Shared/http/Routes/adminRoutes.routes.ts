import { Router } from "express"

import { CreateAdmController } from "../../../Modules/Admins/useCases/createUser/createAdmController"
import { AdminProfileController } from "../../../Modules/Admins/useCases/profileAdmin/profileAdminController"

import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate"

import upload from "../../../Config/upload"
import multer from "multer"
import { ListMembersController } from "../../../Modules/Members/useCases/listMembers/listMembersController"
import { ListUsersController } from "../../../Modules/Admins/useCases/listAdms/listAdminsController"
//import { postRoute } from "./postsRoutes.routes"
import { TextoMdcController } from "../../../Modules/Posts/useCases/getTexto/textoMdcController"
import { UploadAdminAvatarController } from "../../../Modules/Admins/useCases/uploadAdminAvatar/uploadAdminAvatarController"

const adminRoute = Router()

const uploadAvatar = multer(upload)

const createAdmController = new CreateAdmController()
const profileAdminController = new AdminProfileController()
const listUsers = new ListUsersController();
const updateAdminAvatar = new UploadAdminAvatarController()
const getTexto = new TextoMdcController();

const uploadAdminAvatar = multer(upload)

// CREATE ADMIN
adminRoute.post("/", createAdmController.handle)
// DELETE ADMIN
adminRoute.delete("/:id", () => {
    console.log("delete member route working")
})
// ADMIN PROFILE
adminRoute.get("/profile", ensureAdminAuhenticate, profileAdminController.handle);

// ADD AVATAR TO ADMIN
adminRoute.patch("/avatar",uploadAvatar.single("avatar"), ensureAdminAuhenticate, updateAdminAvatar.handle);

// UPLOAD ADMIN AVATAR

// LIST MEMBERS
// adminRoute.get("/members", ensureAdminAuhenticate, listMembers.handle)

// LIST ADMINS
adminRoute.get("/users", ensureAdminAuhenticate, listUsers.handle );

// GET TEXTO PELO ID
adminRoute.get("/texto/:id", ensureAdminAuhenticate, getTexto.handle)

export  { adminRoute };