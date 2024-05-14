import { Router } from "express"
import { CreateAdmController } from "../../../Modules/Admins/useCases/createAdmUseCase/createAdmController"

const adminRoute = Router()

const createAdmController = new CreateAdmController()

adminRoute.post("/", createAdmController.handle)
adminRoute.delete("/:id", () => {
    console.log("delete member route working")
})


export  { adminRoute }