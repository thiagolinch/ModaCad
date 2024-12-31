import { Router } from "express";
import { RefreshTokenAdminController } from "../../../Modules/Admins/useCases/refreshToken/refreshTokenController";
import { CreateSessionAdminController } from "../../../Modules/Admins/useCases/authenticate/createSessionAdminController";

const authenticateAdminRoutes = Router();

const authenticateAdminController = new CreateSessionAdminController();
const refreshTokenAdminController= new RefreshTokenAdminController();

// CRIAR AUTHENTICATION
authenticateAdminRoutes.post("/sessions", authenticateAdminController.handle)
authenticateAdminRoutes.post("/refresh-token", refreshTokenAdminController.handle)

export { authenticateAdminRoutes }