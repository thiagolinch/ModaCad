import { Router } from "express";

import { CreateAssuntoController } from "../../../Modules/Assuntos/useCases/createAssunto/createAssuntoController";
import { DeleteAssuntoController } from "../../../Modules/Assuntos/useCases/deleteAssunto/deleteAssuntoController";
import { ListAssuntoController } from "../../../Modules/Assuntos/useCases/listAssunto/listAssuntoController";
import { ensureAdministrador } from "../middlewares/ensureAdministrador";
import { UpdateAssuntoController } from "../../../Modules/Assuntos/useCases/updateAssunto/updatedAssunto";
import { GetAssuntoController } from "../../../Modules/Assuntos/useCases/getAssunto/getAssuntoController";

const subjectsRoute = Router()

const createAssuntoController = new CreateAssuntoController()
const deleteAssuntoController = new DeleteAssuntoController()
const getAssunto = new GetAssuntoController();
const listAssuntoController = new ListAssuntoController()
const updateAssunto = new UpdateAssuntoController();

subjectsRoute.post("/", ensureAdministrador, createAssuntoController.handle)
subjectsRoute.delete("/:id", ensureAdministrador, deleteAssuntoController.handle)
subjectsRoute.get("/", listAssuntoController.handle)
subjectsRoute.get("/:id", ensureAdministrador,getAssunto.handle)
subjectsRoute.put("/:id",ensureAdministrador, updateAssunto.handle)


export  { subjectsRoute }