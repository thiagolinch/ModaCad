import { Router } from "express";

import { CreateTagController } from "../../../Modules/Tags/useCases/createTag/createTagController";
import { DeleteTagController } from "../../../Modules/Tags/useCases/deleteTag/deleteTagController";

const tagRoutes = Router()

const createTagController = new CreateTagController()
const deleteTagController = new DeleteTagController()


tagRoutes.get("/", (request, response) => {
    return console.log("Tag router")
})

tagRoutes.post("/", createTagController.handle)
tagRoutes.delete("/", deleteTagController.handle)


export  { tagRoutes }