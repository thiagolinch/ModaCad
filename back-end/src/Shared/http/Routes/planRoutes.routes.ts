import { Router } from "express";
import { CreatePlanController } from "../../../Modules/Posts/useCases/PlansUseCases/CreatePlan/createPlanController";
import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate";
import { ensureAdminCanPost } from "../middlewares/ensureCanPost";
import { ListPlansController } from "../../../Modules/Posts/useCases/PlansUseCases/ListPlan/listPlansController";
import { UpdatePlanController } from "../../../Modules/Posts/useCases/PlansUseCases/UpdatePlan/updatePlanController";
import { DeletePlanController } from "../../../Modules/Posts/useCases/PlansUseCases/DeletePlan/deletePlanController";
import { ViewPlanController } from "../../../Modules/Posts/useCases/PlansUseCases/ViewPlan/viewPlanController";


const planRoute = Router()

const create = new CreatePlanController();
const list = new ListPlansController();
const update = new UpdatePlanController();
const deleteController = new DeletePlanController();
const viewPlan = new ViewPlanController();

// CREATE NEW PLAN
planRoute.post("/create", ensureAdminAuhenticate, ensureAdminCanPost, create.handle)

// UPDATE PLAN
planRoute.patch("/update/:id", ensureAdminAuhenticate, ensureAdminCanPost, update.handle)

// DELETE PLAN
planRoute.delete("/delete/:id", ensureAdminAuhenticate, ensureAdminCanPost, deleteController.handle)

// LIST PLANS
planRoute.get("/list", list.handle)

// VIEW PLAN
planRoute.get("/view/:id", viewPlan.handle)

export { planRoute }