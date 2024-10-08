import { Router } from "express";
import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate";
import { ListStatusController } from "../../../Modules/Posts/useCases/StatusUseCases/listStatus/listStatusController";
import { GetStatusController } from "../../../Modules/Posts/useCases/StatusUseCases/getStatus/getStatusController";


const statusRoute = Router()

const listStatus = new ListStatusController();
const getStatus = new GetStatusController();

statusRoute.get("/", ensureAdminAuhenticate, listStatus.handle);
statusRoute.get("/:id", ensureAdminAuhenticate, getStatus.handle)

export {statusRoute}