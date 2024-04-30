import { Router } from "express";

import { CreateTagController } from "../../../Modules/Tags/useCases/createTag/createCarController";

const tagRoutes = Router()

const createCarController = new CreateTagController()


tagRoutes.get("/", (request, response) => {
    return console.log("Tag router")
})

tagRoutes.post("/", createCarController.handle)


export  { tagRoutes }