import { Router } from "express";

import { CreateTagController } from "../../../Modules/Assuntos/useCases/createTag/createTagController";
import { DeleteTagController } from "../../../Modules/Assuntos/useCases/deleteTag/deleteTagController";
import { ensureAuhenticate } from "../middlewares/ensureAuthenticate";
import { ListTagController } from "../../../Modules/Assuntos/useCases/listTags/listTagController";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const subjectsRoute = Router()

const createTagController = new CreateTagController()
const deleteTagController = new DeleteTagController()
const listTagController = new ListTagController()

subjectsRoute.post("/", ensureAuhenticate, ensureAdmin, createTagController.handle)
subjectsRoute.delete("/",ensureAuhenticate, deleteTagController.handle)
subjectsRoute.get("/", listTagController.handle)


export  { subjectsRoute }