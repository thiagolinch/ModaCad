import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreatePaymentController } from "../../../Modules/Admins/useCases/PagamentosUseCase/createPayment/createPaymentController";
import { CreatePlanMPController } from "../../../Modules/Admins/useCases/PagamentosUseCase/createPlan/createPlanMPController";



const paymentRoute = Router();
paymentRoute.use(ensureAuthenticate);

const createPay = new CreatePaymentController();
const createPlan = new CreatePlanMPController();

paymentRoute.post("/create", createPay.handle);
paymentRoute.post("/plan", createPlan.handle);

export { paymentRoute }