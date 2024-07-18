import { Router } from "express";

import { CreateTagController } from "../../../Modules/Tags/useCases/createTag/createTagController";
import { DeleteTagController } from "../../../Modules/Tags/useCases/deleteTag/deleteTagController";
import { ensureAuhenticate } from "../../../middlewares/admins/ensureAuthenticate";
import { ListTagController } from "../../../Modules/Tags/useCases/listTags/listTagController";

const tagRoutes = Router()

const createTagController = new CreateTagController()
const deleteTagController = new DeleteTagController()
const listTagController = new ListTagController()

tagRoutes.post("/", ensureAuhenticate, createTagController.handle)
tagRoutes.delete("/",ensureAuhenticate, deleteTagController.handle)
tagRoutes.get("/", listTagController.handle)


export  { tagRoutes }