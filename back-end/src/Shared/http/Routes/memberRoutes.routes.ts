import { Router } from "express";

import { CreateMemberController } from "../../../Modules/Members/useCases/createMember/createMemberController";
import { ensureUserAuthenticate } from "../middlewares/ensureUserAuthenticate";
import { UserProfileController } from "../../../Modules/Members/useCases/userProfile/userProfileController";
import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate";
import { ListMembersController } from "../../../Modules/Members/useCases/listMembers/listMembersController";

const memberRoutes = Router()

const createMemberController = new CreateMemberController();
const profileMember = new UserProfileController();

memberRoutes.post("/", createMemberController.handle)
memberRoutes.delete("/:id", () => {
    console.log("delete member route working")
});
memberRoutes.get("/profile", ensureUserAuthenticate, profileMember.handle);

export  { memberRoutes }