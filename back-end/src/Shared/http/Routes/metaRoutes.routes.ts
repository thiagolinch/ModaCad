import { Router } from "express";
import { GetMetaByIdController } from "../../../Modules/Posts/useCases/MetaRepository/getById/getMetaByIdController";
import { GetMetaByPostController } from "../../../Modules/Posts/useCases/MetaRepository/getByPost/getMetaByPostController";


const metaRoute = Router()

const getMetaById = new GetMetaByIdController();
const getMetaByPost =  new GetMetaByPostController();

metaRoute.get("/:id", getMetaById.execute);
metaRoute.get("/post/:id", getMetaByPost.handle);

export { metaRoute }