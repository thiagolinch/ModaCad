import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreatePaymentController } from "../../../Modules/Admins/useCases/Pagamentos/createPayment/createPaymentController";
import { CreatePlanMPController } from "../../../Modules/Admins/useCases/Pagamentos/criarRecorrencia/createPlanMPController";
import { GetPaymentController } from "../../../Modules/Admins/useCases/Pagamentos/getPayment/getPaymentController";
import { UpdateUserPaymentController } from "../../../Modules/Admins/useCases/Pagamentos/webhook/webHookController";



const paymentRoute = Router();

const createPay = new CreatePaymentController();
const createPlan = new CreatePlanMPController();
const getPay = new GetPaymentController();
const updateUser = new UpdateUserPaymentController();


paymentRoute.post("/create", ensureAuthenticate, createPay.handle);
paymentRoute.post("/plan", ensureAuthenticate, createPlan.handle);
paymentRoute.get("/:id", ensureAuthenticate, getPay.handle);
paymentRoute.post("/feedback", updateUser.handle);

export { paymentRoute }