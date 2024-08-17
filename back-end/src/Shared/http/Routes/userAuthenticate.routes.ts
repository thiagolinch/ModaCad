import { Router } from "express";

import { CreateSessionUserController } from "../../../Modules/Members/useCases/authenticate/createSessionMemberController";

const userAuth = Router()

const authUserController = new CreateSessionUserController()

// CRIAR AUTH USER
userAuth.post("/", authUserController.handle)

// REFRESH TOKEN


export { userAuth }