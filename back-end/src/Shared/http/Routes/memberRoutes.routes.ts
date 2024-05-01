import { Router } from "express"
import { CreateMemberController } from "../../../Modules/Members/useCases/createMember/createMemberController"

const memberRoutes = Router()

const createMemberController = new CreateMemberController()

memberRoutes.post("/", createMemberController.handle)
memberRoutes.delete("/:id", () => {
    console.log("delete member route working")
})


export  { memberRoutes }