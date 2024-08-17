import { Router } from "express";

import { subjectsRoute } from "./tagRoutes.routes";
import { memberRoutes } from "./memberRoutes.routes";
import { adminRoute } from "./adminRoutes.routes";
import { authenticateAdminRoutes } from "./adminAuthenticate.routes";
import { postRoute } from "./postsRoutes.routes";
import { userAuth } from "./userAuthenticate.routes";


const routes = Router();

routes.use("/subjects", subjectsRoute)
routes.use("/members", memberRoutes)
routes.use("/auth", userAuth)
routes.use("/admins", adminRoute)
routes.use("/admin-session", authenticateAdminRoutes)
routes.use("/post", postRoute)

export { routes }   