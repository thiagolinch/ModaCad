import { Router } from "express";

import { CreateAssuntoController } from "../../../Modules/Assuntos/useCases/createAssunto/createAssuntoController";
import { DeleteAssuntoController } from "../../../Modules/Assuntos/useCases/deleteAssunto/deleteAssuntoController";
import { ListAssuntoController } from "../../../Modules/Assuntos/useCases/listAssunto/listAssuntoController";
import { ensureAdminCanPost } from "../middlewares/ensureCanPost";

const subjectsRoute = Router()

const createAssuntoController = new CreateAssuntoController()
const deleteAssuntoController = new DeleteAssuntoController()
const listAssuntoController = new ListAssuntoController()

subjectsRoute.post("/", createAssuntoController.handle)
subjectsRoute.delete("/", ensureAdminCanPost, deleteAssuntoController.handle)
subjectsRoute.get("/", listAssuntoController.handle)


export  { subjectsRoute }