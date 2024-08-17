import { Router } from "express";
import { CreatePostController } from "../../../Modules/Posts/useCases/createPost/createPostController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate";
import { ListAllTextController } from "../../../Modules/Posts/useCases/listAll/listAllTextController";
import { ListPilulasController } from "../../../Modules/Posts/useCases/listPostsPilulas/listPilulasController";
import { ListTextosController } from "../../../Modules/Posts/useCases/listPostsTextos/listTextosController";


const postRoute = Router()

const createPost = new CreatePostController();
const listAll = new ListAllTextController();
const listPilulas = new ListPilulasController();
const listTextos = new ListTextosController();

// CREATE POST
postRoute.post("/", createPost.handle)

// LIST ALL
postRoute.get("/", listAll.handle)

// LIST TEXTOS
postRoute.get("/textos", listTextos.handle)

// LIST PILULAS
postRoute.get("/pilulas", listPilulas.handle)

export { postRoute }