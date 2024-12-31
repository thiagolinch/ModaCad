import { Router } from "express";
import { SendForgotPasswordEmailController } from "../../../Modules/Admins/useCases/sendForgotPasswordEmail/sendForgotPasswordEmailController";
import { ResetUserPasswordController } from "../../../Modules/Admins/useCases/resetUserPassword/resetUserPasswordController";

const passwordRoutes = Router();

const sendForgotPasswordEmailContoller = new SendForgotPasswordEmailController();
const resetPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordEmailContoller.handle)
passwordRoutes.post("/reset", resetPasswordController.handle)

export { passwordRoutes }