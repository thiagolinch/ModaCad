import { Router } from "express";
import { CreatePostController } from "../../../Modules/Posts/useCases/createPost/createPostController";

import upload from "../../../Config/upload"

import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate";
import { ListAllTextController } from "../../../Modules/Posts/useCases/listAll/listAllTextController";
import { ListPilulasController } from "../../../Modules/Posts/useCases/listPostsPilulas/listPilulasController";
import { ListTextosController } from "../../../Modules/Posts/useCases/listPostsTextos/listTextosController";


import multer from "multer";
import { UploadArticleImageController } from "../../../Modules/Posts/useCases/uploadImage/uploadArticleImageController";
import { GetImagesController } from "../../../Modules/Posts/useCases/getImages/getImagesController";
import { CreateArticleSubjectsController } from "../../../Modules/Posts/useCases/createPostSubjects/createPostSubjectsController";


const postRoute = Router()

const uploadArticleImageMulter = multer(upload)

const createPost = new CreatePostController();
const listAll = new ListAllTextController();
const listPilulas = new ListPilulasController();
const listTextos = new ListTextosController();
const uploadArticleImage = new UploadArticleImageController();
const getArticleImage = new GetImagesController();
const createArticleSubject = new CreateArticleSubjectsController();

// CREATE POST
postRoute.post("/", createPost.handle)

// CREATE POST SUBJECTS
postRoute.post("/subjects/:id", ensureAdminAuhenticate, createArticleSubject.handle)

// LIST ALL
postRoute.get("/", listAll.handle)

// LIST TEXTOS
postRoute.get("/textos", listTextos.handle)

// LIST PILULAS
postRoute.get("/pilulas", listPilulas.handle)

// UPLOAD IMAGE TO ARTICLE
postRoute.post("/images/:id", uploadArticleImageMulter.array("images"), uploadArticleImage.handle)

// GET IMAGE FROM S3
postRoute.get("/images/:image_name", getArticleImage.handle)



export { postRoute }