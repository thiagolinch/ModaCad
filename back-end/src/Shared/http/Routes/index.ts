import { Router } from "express";

import { tagRoutes } from "./tagRoutes.routes";
import { memberRoutes } from "./memberRoutes.routes";

const routes = Router();

routes.use("/tags", tagRoutes)
routes.use("/members", memberRoutes)

export { routes }