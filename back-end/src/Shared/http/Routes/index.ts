import { Router } from "express";

import { subjectsRoute } from "./assuntosRoutes.routes";
import { adminRoute } from "./adminRoutes.routes";
import { authenticateAdminRoutes } from "./adminAuthenticate.routes";
import { postRoute } from "./postsRoutes.routes";
import { tagsRoute } from "./tagRoutes.routes";
import { metaRoute } from "./metaRoutes.routes";
import { statusRoute } from "./statusRoutes.routes";
import { planRoute } from "./planRoutes.routes";
import { paymentRoute } from "./paymentsRoutes.routes";
import { passwordRoutes } from "./password.routes";


const routes = Router();

routes.use("/subjects", subjectsRoute)
routes.use("/admins", adminRoute)
routes.use("/admin-session", authenticateAdminRoutes)
routes.use("/post", postRoute)
routes.use("/tags", tagsRoute)
routes.use("/meta", metaRoute)
routes.use("status", statusRoute)
routes.use("/plan", planRoute)
routes.use("/payment", paymentRoute)
routes.use("/password", passwordRoutes)

export { routes }   