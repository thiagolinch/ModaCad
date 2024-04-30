import { Router } from "express"
import { CreateMemberController } from "../../../Modules/Members/useCases/createMember/createMemberController"

const memberRoutes = Router()

const createMemberController = new CreateMemberController()

memberRoutes.post("/", createMemberController.handle)


export  { memberRoutes }