import { Router } from "express";
import { CreateTagController } from "../../../Modules/Posts/useCases/TagsUseCases/createTag/createTagController"
import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate";
import { ensureAdministrador } from "../middlewares/ensureAdministrador";
import { DeleteTagController } from "../../../Modules/Posts/useCases/TagsUseCases/deleteTag/deleteTagController";
import { ListTagsController } from "../../../Modules/Posts/useCases/TagsUseCases/listTags/listTagsController";
import { UpdateTagController } from "../../../Modules/Posts/useCases/TagsUseCases/updateTag/updateTagController";
import { GetTagController } from "../../../Modules/Posts/useCases/TagsUseCases/getTag/getTagController";


const tagsRoute = Router()
tagsRoute.use(ensureAdminAuhenticate)

const createTagControler = new CreateTagController();
const deleteTag = new DeleteTagController();
const updateTag = new UpdateTagController();
const getTag = new GetTagController();
const listTags = new ListTagsController();

// CREATE TAG
tagsRoute.post("/", createTagControler.handle)

// DELETE TAG
tagsRoute.delete("/:id", ensureAdministrador, deleteTag.handle)

// UPDATE TAG
tagsRoute.patch("/:id", ensureAdministrador, updateTag.handle)

// LIST TAG
tagsRoute.get("/", listTags.handle)

// GET TAG BY ID
tagsRoute.get("/:id", getTag.handle)

export { tagsRoute }