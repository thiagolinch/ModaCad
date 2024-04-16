import { Router } from "express";

import { tagRoutes } from "./tagRoutes.routes";

const routes = Router();

routes.use("/tags", tagRoutes)

export { routes }