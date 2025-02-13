import { Request, Response, Router } from "express";
import { CreatePostController } from "../../../Modules/Posts/useCases/PostUseCases/createPost/createPostController";

import upload from "../../../Config/upload";

import { ensureAdminAuhenticate } from "../middlewares/ensureAdminAuthenticate";
import { FilterTextoController } from "../../../Modules/Posts/useCases/PostUseCases/filterPosts/filterTextosController";


import multer from "multer";
import { UploadArticleImageController } from "../../../Modules/Posts/useCases/PostUseCases/uploadImage/uploadArticleImageController";
import { GetImagesController } from "../../../Modules/Posts/useCases/PostUseCases/getImages/getImagesController";
import { DeletePostController } from "../../../Modules/Posts/useCases/PostUseCases/deletepost/deletePostController";
import { UpdatePostController } from "../../../Modules/Posts/useCases/PostUseCases/updatePost/updatePostController";

import { TextoMdcController } from "../../../Modules/Posts/useCases/PostUseCases/getTexto/textoMdcController";

import { UploadFeatureImageController } from "../../../Modules/Posts/useCases/PostUseCases/uploadFeatureImage/uploadFeatureImageController";
import { DeleteFeatureImageController } from "../../../Modules/Posts/useCases/PostUseCases/deleteFeatureImage/deleteFeatureImageController";
import { CreatePostSubjectController } from "../../../Modules/Posts/useCases/SubjectUseCases/createPostSubject/createPostSubjectController";
import { LastPostController } from "../../../Modules/Posts/useCases/PostUseCases/lastPost/lastPostController";
import { SearchPostController } from "../../../Modules/Posts/useCases/PostUseCases/searchByTerm/SearchByTermController";
import { validatePostPermissions } from "../middlewares/validatePostPermissions";
import { userCanAccess } from "../middlewares/userCanAccess";


const postRoute = Router()

const uploadArticleImageMulter = multer(upload)
const createPost = new CreatePostController();
const getTexto = new TextoMdcController();
const updatePost = new UpdatePostController();
const deletepost = new DeletePostController()
const filterTexto = new FilterTextoController();
const searchPost = new SearchPostController();
const lastPost = new LastPostController();

const uploadArticleImage = new UploadArticleImageController();
const uploadFeatureImage = new UploadFeatureImageController();
const deleteFeatureImage = new DeleteFeatureImageController();
const getArticleImage = new GetImagesController();
const createPostSubject = new CreatePostSubjectController();


// CREATE POST
postRoute.post("/", ensureAdminAuhenticate, validatePostPermissions, createPost.handle)

// PATH TO POST A POST
postRoute.patch("/:id", ensureAdminAuhenticate, validatePostPermissions, function(req: Request, res: Response) {
    const id = req.params
    const status = req.postStatus
    res.status(200).json({ message: status })
})

// DELETE POST
postRoute.delete("/:id", ensureAdminAuhenticate, validatePostPermissions, deletepost.handle)

// CREATE POST SUBJECTS
// postRoute.post("/subjects/:id", ensureAdminAuhenticate, validatePostPermissions, createPostSubject.handle)

// UPDATE POST
postRoute.put("/:id", ensureAdminAuhenticate, validatePostPermissions, updatePost.handle)

// GET TEXTO PELO ID
postRoute.get("/:identifier", getTexto.handle)

// LAST POST
postRoute.get("/last/publish", lastPost.handle)

// LIST ALL POSTS, CAN FILTER BY TYPE AND STATUS
// baseURL/post/list?type=texto&status=&autor=
postRoute.get("/", filterTexto.handle)

// SEARCH 
// baseUrl/post/search?term=&limit=&order=&page=
postRoute.post("/search", searchPost.handle);

// POST BY SUBJECT
postRoute.get("/subject")

// UPLOAD IMAGE TO ARTICLE
postRoute.post("/images", ensureAdminAuhenticate, uploadArticleImageMulter.single("image"), uploadArticleImage.handle)

// UPLOAD FEATURE IMAGE TO ARTICLE
postRoute.post("/images/feature-image/:id", ensureAdminAuhenticate, uploadArticleImageMulter.single("images"), uploadFeatureImage.handle)

// DELETE FEATURE IMAGE FROM ARTICLE
postRoute.delete("/images/feature-image/:id", ensureAdminAuhenticate, deleteFeatureImage.handle)

// GET IMAGE FROM S3 
postRoute.get("/images/:id", getArticleImage.handle)

export { postRoute }