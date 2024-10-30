import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreatePaymentController } from "../../../Modules/Admins/useCases/Pagamentos/createPayment/createPaymentController";
import { CreatePlanMPController } from "../../../Modules/Admins/useCases/Pagamentos/createPlan/createPlanMPController";
import { GetPaymentController } from "../../../Modules/Admins/useCases/Pagamentos/getPayment/getPaymentController";



const paymentRoute = Router();
paymentRoute.use(ensureAuthenticate);

const createPay = new CreatePaymentController();
const createPlan = new CreatePlanMPController();
const getPay = new GetPaymentController();

paymentRoute.post("/create", createPay.handle);
paymentRoute.post("/plan", createPlan.handle);
paymentRoute.get("/:id", ensureAuthenticate, getPay.handle)

export { paymentRoute }