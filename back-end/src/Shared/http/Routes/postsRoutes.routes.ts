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
import { DeletePostController } from "../../../Modules/Posts/useCases/deletepost/deletePostController";
import { ensureAdminCanPost } from "../middlewares/ensureEditor";
import { ensureAuthor } from "../middlewares/ensureAuthor";


const postRoute = Router()

const uploadArticleImageMulter = multer(upload)

const createPost = new CreatePostController();
const deletepost = new DeletePostController()
const listAll = new ListAllTextController();
const listPilulas = new ListPilulasController();
const listTextos = new ListAllTextController();
const uploadArticleImage = new UploadArticleImageController();
const getArticleImage = new GetImagesController();
const createArticleSubject = new CreateArticleSubjectsController();


// CREATE POST
postRoute.post("/", ensureAdminAuhenticate, ensureAdminCanPost, createPost.handle)

// DELETE POST
postRoute.delete("/:id", ensureAdminAuhenticate, ensureAuthor, deletepost.handle)

// CREATE POST SUBJECTS
postRoute.post("/subjects/:id", ensureAdminAuhenticate, ensureAuthor, createArticleSubject.handle)

// UPDATE POST
postRoute.patch("/:id", ensureAdminAuhenticate,)

// PUBLISH POST

// LIST ALL POSTS, CAN FILTER BY TYPE AND STATUS
// baseURL/post/list?type=texto&status=
postRoute.get("/list", listAll.handle)

// LIST TEXTOS BY STATUS
// postRoute.get("/textos", listTextos.handle)
// postRoute.get("/list", listTextos.handle)

// LIST PILULAS BY STATUS
// postRoute.get("/pilulas", listPilulas.handle)
// postRoute.get("/pilulas", listPilulas.handle)

// UPLOAD IMAGE TO ARTICLE
postRoute.post("/images/:id", ensureAdminAuhenticate, uploadArticleImageMulter.array("images"), uploadArticleImage.handle)

// GET IMAGE FROM S3
postRoute.get("/images/:image_name", getArticleImage.handle)



export { postRoute }