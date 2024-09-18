import { Router } from "express";
import { CreatePostController } from "../../../Modules/Posts/useCases/createPost/createPostController";

import upload from "../../../Config/upload"

import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate";
import { FilterTextoController } from "../../../Modules/Posts/useCases/filterPosts/filterTextosController";


import multer from "multer";
import { UploadArticleImageController } from "../../../Modules/Posts/useCases/uploadImage/uploadArticleImageController";
import { GetImagesController } from "../../../Modules/Posts/useCases/getImages/getImagesController";
import { CreateArticleSubjectsController } from "../../../Modules/Posts/useCases/createPostSubjects/createPostSubjectsController";
import { DeletePostController } from "../../../Modules/Posts/useCases/deletepost/deletePostController";
import { ensureAdminCanPost } from "../middlewares/ensureCanPost";
import { ensurCanDelete } from "../middlewares/ensurCanDelete";
import { ListPostsController } from "../../../Modules/Posts/useCases/listPosts/ListPostsController";
import { UpdatePostController } from "../../../Modules/Posts/useCases/updatePost/updatePostController";
import { TextoMdcController } from "../../../Modules/Posts/useCases/getTexto/textoMdcController";


const postRoute = Router()

const uploadArticleImageMulter = multer(upload)

const createPost = new CreatePostController();
const getTexto = new TextoMdcController();
const updatePost = new UpdatePostController();
const deletepost = new DeletePostController()
const filterTexto = new FilterTextoController();
const listPosts = new ListPostsController()
const uploadArticleImage = new UploadArticleImageController();
const getArticleImage = new GetImagesController();
const createArticleSubject = new CreateArticleSubjectsController();


// CREATE POST
postRoute.post("/", ensureAdminAuhenticate, createPost.handle)

// DELETE POST
postRoute.delete("/:id", ensureAdminAuhenticate, ensurCanDelete, deletepost.handle)

// CREATE POST SUBJECTS
postRoute.post("/subjects/:id", ensureAdminAuhenticate, ensureAdminCanPost, createArticleSubject.handle)

// UPDATE POST
postRoute.put("/:id", ensureAdminAuhenticate, ensureAdminCanPost, updatePost.handle)

// GET TEXTO PELO ID
postRoute.get("/:id", getTexto.handle)

// UPDATE STATUS POST

// LIST ALL POSTS, CAN FILTER BY TYPE AND STATUS
// baseURL/post/list?type=texto&status=&autor=
postRoute.get("/filter", filterTexto.handle)

// GET ALL POSTS 
postRoute.get("/", listPosts.handle)

// LIST TEXTOS BY STATUS
// postRoute.get("/textos", listTextos.handle)

// LIST PILULAS BY STATUS
// postRoute.get("/pilulas", listPilulas.handle)

// UPLOAD IMAGE TO ARTICLE
postRoute.post("/images/:id", ensureAdminAuhenticate, uploadArticleImageMulter.array("images"), uploadArticleImage.handle)

// GET IMAGE FROM S3
postRoute.get("/images/:id", getArticleImage.handle)



export { postRoute }