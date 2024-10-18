import { Router } from "express"

import { AdminProfileController } from "../../../Modules/Admins/useCases/profileAdmin/profileAdminController"

import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate"

import upload from "../../../Config/upload"
import multer from "multer"

import { ListUsersController } from "../../../Modules/Admins/useCases/listAdms/listAdminsController"

import { UploadAdminAvatarController } from "../../../Modules/Admins/useCases/uploadAdminAvatar/uploadAdminAvatarController"
import { UpdateUserController } from "../../../Modules/Admins/useCases/updateUser/updateUserController"
import { ensureAdministrador } from "../middlewares/ensureAdministrador"
import { CreateUserController } from "../../../Modules/Admins/useCases/createUser/createUserController"
import { CreateAdmController } from "../../../Modules/Admins/useCases/createAdmin/createAdmController"
import { ListStaffController } from "../../../Modules/Admins/useCases/listStaf/listStafController"
import { DeleteUserController } from "../../../Modules/Admins/useCases/deleteUser/deleteuserController"
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate"
import { CreatePaymentController } from "../../../Modules/Admins/useCases/PagamentosUseCase/createPayment/createPaymentController"
import { CreatePlanMPController } from "../../../Modules/Admins/useCases/PagamentosUseCase/createPlan/createPlanMPController"

const adminRoute = Router()

const uploadAvatar = multer(upload)

const createUserController = new CreateUserController()
const createAdm = new CreateAdmController()
const updateControler = new UpdateUserController()
const deleteuser = new DeleteUserController();

const profileAdminController = new AdminProfileController()
const listUsers = new ListUsersController();
const listStaff = new ListStaffController();
const updateAdminAvatar = new UploadAdminAvatarController()

const paymenteCreate = new CreatePaymentController();
const mpPlan = new CreatePlanMPController();

const uploadAdminAvatar = multer(upload)

// CREATE USER
adminRoute.post("/", createUserController.handle)

// CREATE STAFF
adminRoute.post("/staff", ensureAdminAuhenticate, ensureAdministrador, createAdm.handle)

// LIST STAFF
adminRoute.get("/staff", ensureAdminAuhenticate, listStaff.handle)

// UPDATE USER 
adminRoute.put("/:id", ensureAdminAuhenticate, ensureAdministrador, updateControler.handle)

// DELETE ADMIN
adminRoute.delete("/delete/:id", ensureAdminAuhenticate, ensureAdministrador,  deleteuser.handle)

// ADMIN PROFILE
adminRoute.get("/profile", ensureAuthenticate, profileAdminController.handle);

// ADD AVATAR TO ADMIN
adminRoute.patch("/avatar",uploadAvatar.single("avatar"), ensureAdminAuhenticate, updateAdminAvatar.handle);

// LIST ADMINS
adminRoute.get("/users", ensureAdminAuhenticate, listUsers.handle );


export  { adminRoute };