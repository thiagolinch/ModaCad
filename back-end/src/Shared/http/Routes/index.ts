import { Router } from "express";

import { tagRoutes } from "./tagRoutes.routes";
import { memberRoutes } from "./memberRoutes.routes";
import { adminRoute } from "./adminRoutes.routes";
import { ensureAuhenticate } from "../../../middlewares/admins/ensureAuthenticate";

const routes = Router();

routes.use("/tags", tagRoutes)
routes.use("/members", memberRoutes)
routes.use("/admins", adminRoute)


export { routes }   