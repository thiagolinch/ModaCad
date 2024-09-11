import { Router } from "express";

import { CreateTagController } from "../../../Modules/Assuntos/useCases/createTag/createTagController";
import { DeleteTagController } from "../../../Modules/Assuntos/useCases/deleteTag/deleteTagController";
import { ListTagController } from "../../../Modules/Assuntos/useCases/listTags/listTagController";
import { ensureAdminCanPost } from "../middlewares/ensureCanPost";

const subjectsRoute = Router()

const createTagController = new CreateTagController()
const deleteTagController = new DeleteTagController()
const listTagController = new ListTagController()

subjectsRoute.post("/", createTagController.handle)
subjectsRoute.delete("/", ensureAdminCanPost, deleteTagController.handle)
subjectsRoute.get("/", listTagController.handle)


export  { subjectsRoute }