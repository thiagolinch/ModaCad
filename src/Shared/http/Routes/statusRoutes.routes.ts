import { Router } from "express";
import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate";
import { ListStatusController } from "../../../Modules/Posts/useCases/StatusUseCases/listStatus/listStatusController";
import { GetStatusController } from "../../../Modules/Posts/useCases/StatusUseCases/getStatus/getStatusController";
import { ensureAdministrador } from "../middlewares/ensureAdministrador";


const statusRoute = Router()

const listStatus = new ListStatusController();
const getStatus = new GetStatusController();

statusRoute.get("/", ensureAdministrador, listStatus.handle);
statusRoute.get("/:id", ensureAdministrador, getStatus.handle)

export {statusRoute}