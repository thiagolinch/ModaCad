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
import { DeleteUserController } from "../../../Modules/Admins/useCases/Delete/deleteUser/deleteuserController"
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate"
import { CreatePaymentController } from "../../../Modules/Admins/useCases/Pagamentos/createPayment/createPaymentController"
import { CreatePlanMPController } from "../../../Modules/Admins/useCases/Pagamentos/criarRecorrencia/createPlanMPController"
import { UserGetPlanController } from "../../../Modules/Admins/useCases/userGetPlan/userGetPlanController"
import { GetUserByIdController } from "../../../Modules/Admins/useCases/getUseById/getUseByIdController"
import { DeleteStaffController } from "../../../Modules/Admins/useCases/Delete/deleteStaff/deleteStaffController"
import { RestoreStaffController } from "../../../Modules/Admins/useCases/Delete/restorStaff/restoreStaffController"
import { ExportMembersController } from "../../../Modules/Admins/useCases/exportMembers/exportMembersController"

const adminRoute = Router()

const uploadAvatar = multer(upload)

const createUserController = new CreateUserController()
const createAdm = new CreateAdmController()
const updateControler = new UpdateUserController();

const deleteuser = new DeleteUserController();
const deleteStaff = new DeleteStaffController();
const restoreStaff = new RestoreStaffController();

const getUserById = new GetUserByIdController();

const profileAdminController = new AdminProfileController()
const listUsers = new ListUsersController();
const exportMembers = new ExportMembersController();
const listStaff = new ListStaffController();
const updateAdminAvatar = new UploadAdminAvatarController()

const updatePlan = new UserGetPlanController();
const paymenteCreate = new CreatePaymentController();
const mpPlan = new CreatePlanMPController();

const uploadAdminAvatar = multer(upload)

// CREATE USER
adminRoute.post("/", createUserController.handle)

// CREATE STAFF
adminRoute.post("/staff", ensureAdminAuhenticate, ensureAdministrador, createAdm.handle)

// LIST STAFF
adminRoute.get("/staff", ensureAdminAuhenticate, listStaff.handle)

// UPDATE STAFF 
adminRoute.put("/staff/:id", ensureAdminAuhenticate, ensureAdministrador, updateControler.handle)

// UPDATE OWN PROFILE 
adminRoute.put("/profile", ensureAuthenticate, updateControler.handle)

// GET USER BY ID
adminRoute.get("/user/:id", ensureAdminAuhenticate, ensureAdministrador, getUserById.handle)

// UPDATE USER PLAN
adminRoute.put("/new-plan/:id", ensureAuthenticate, updatePlan.handle)

// DELETE USER
adminRoute.delete("/delete/:id", ensureAdminAuhenticate, ensureAdministrador,  deleteuser.handle)

// PROFILE
adminRoute.get("/profile", ensureAuthenticate, profileAdminController.handle);

// ADD AVATAR TO ADMIN
adminRoute.patch("/profile/avatar",uploadAvatar.single("avatar"), ensureAuthenticate, updateAdminAvatar.handle);

// LIST USERS WITH FILTERS
adminRoute.get("/users", ensureAdminAuhenticate, listUsers.handle );

// EXPORT MEMBERS ROUTE
adminRoute.get(
    "/export-members",
    ensureAdminAuhenticate,
    ensureAdministrador, // ou o middleware adequado ao seu controle de acesso
    exportMembers.handle
);

// DELETE STAFF
adminRoute.delete("/staff/delete/:id", ensureAdminAuhenticate, ensureAdministrador, deleteStaff.handle)
// RESOTRE STAFF
adminRoute.patch("/staff/restore/:id", ensureAdminAuhenticate, ensureAdministrador, restoreStaff.handle)


export  { adminRoute };