import { Router } from "express"

import { CreateAdmController } from "../../../Modules/Admins/useCases/createAdmUseCase/createAdmController"
import { CreateSessionAdminController } from "../../../Modules/Admins/useCases/authenticate/createSessionAdminController"

const adminRoute = Router()

const createAdmController = new CreateAdmController()
const createSessionsAdmController = new CreateSessionAdminController()

// CREATE ADMIN
adminRoute.post("/", createAdmController.handle)
// CREATE AUTHENTICATION ADMIN
adminRoute.post("/authenticate", createSessionsAdmController.handle);
// DELETE ADMIN
adminRoute.delete("/:id", () => {
    console.log("delete member route working")
})


export  { adminRoute }