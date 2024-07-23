import { Router } from "express";

import { subjectsRoute } from "./tagRoutes.routes";
import { memberRoutes } from "./memberRoutes.routes";
import { adminRoute } from "./adminRoutes.routes";
import { ensureAuhenticate } from "../middlewares/ensureAuthenticate";

const routes = Router();

routes.use("/subjects", subjectsRoute)
routes.use("/members", memberRoutes)
routes.use("/admins", adminRoute)


export { routes }   