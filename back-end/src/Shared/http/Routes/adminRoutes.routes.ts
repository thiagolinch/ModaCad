import { Router } from "express"

import { CreateAdmController } from "../../../Modules/Admins/useCases/createAdmUseCase/createAdmController"
import { AdminProfileController } from "../../../Modules/Admins/useCases/profileAdmin/profileAdminController"

import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate"

import upload from "../../../Config/upload/upload"
import multer from "multer"
import { ListMembersController } from "../../../Modules/Members/useCases/listMembers/listMembersController"
import { ListAdminsController } from "../../../Modules/Admins/useCases/listAdms/listAdminsController"
import { postRoute } from "./postsRoutes.routes"
import { TextoMdcController } from "../../../Modules/Posts/useCases/textoMDC/textoMdcController"

const adminRoute = Router()

const createAdmController = new CreateAdmController()
const profileAdminController = new AdminProfileController()
const listMembers = new ListMembersController();
const listAdms = new ListAdminsController();
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

// UPLOAD ADMIN AVATAR

// LIST MEMBERS
adminRoute.get("/members", ensureAdminAuhenticate, listMembers.handle)

// LIST ADMINS
adminRoute.get("/admins-list", ensureAdminAuhenticate, listAdms.handle );

// GET TEXTO PELO ID
adminRoute.get("/texto/:id", ensureAdminAuhenticate, getTexto.handle)

export  { adminRoute };