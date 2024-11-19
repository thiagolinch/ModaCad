import { Router } from "express";

import { CreateAssuntoController } from "../../../Modules/Assuntos/useCases/createAssunto/createAssuntoController";
import { DeleteAssuntoController } from "../../../Modules/Assuntos/useCases/deleteAssunto/deleteAssuntoController";
import { ListAssuntoController } from "../../../Modules/Assuntos/useCases/listAssunto/listAssuntoController";
import { ensureAdminCanPost } from "../middlewares/ensureCanPost";
import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate";
import { ensureAdministrador } from "../middlewares/ensureAdministrador";
import { UpdateAssuntoController } from "../../../Modules/Assuntos/useCases/updateAssunto/updatedAssunto";

const subjectsRoute = Router()

const createAssuntoController = new CreateAssuntoController()
const deleteAssuntoController = new DeleteAssuntoController()
const listAssuntoController = new ListAssuntoController()
const updateAssunto = new UpdateAssuntoController();

subjectsRoute.post("/", ensureAdministrador, createAssuntoController.handle)
subjectsRoute.delete("/", ensureAdministrador, deleteAssuntoController.handle)
subjectsRoute.get("/", listAssuntoController.handle)
subjectsRoute.put("/:id",ensureAdministrador, updateAssunto.handle)


export  { subjectsRoute }