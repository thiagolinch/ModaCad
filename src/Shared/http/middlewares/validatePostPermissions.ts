import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";
import { AdminRoleRepository } from "../../../Modules/Admins/repositories/implements/AdminRoleRepository";
import { ArticleRepository } from "../../../Modules/Posts/repository/implements/ArticlesRepository";
import { Articles } from "Modules/Posts/entity/Articles";

const CONFIG = {
    ERROR_MESSAGES: {
        TOKEN_MISSING: "Token ausente",
        TOKEN_INVALID: "Token inválido",
        USER_NOT_FOUND: "Usuário não encontrado",
        ROLE_NOT_FOUND: "Função não encontrada",
        USER_NOT_ALLOWED: "Usuario nao permitido"
    },
};

interface IPayload {
    subject: string;
    role: string;
}

export async function validatePostPermissions(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const body = req.body;
    const admin = req.admin;
    const { id } = req.params;

    try {

        // Busca info do post se ja existente
        const postRepo = new ArticleRepository();

        let post: Articles;

        if(id) {
            post = await postRepo.findById(id)
        }

        // Lógica de definição de status do post
        let postStatus = post?.status || ""; // Default status
        const method = req.method;

        // Verifica permissões e métodos
        if (["autor", "curador"].includes(admin.role)) {

            if (method === "POST") {
                postStatus = "draft"; // Criação sempre como rascunho
            }

            if (method === "PUT") {
                body.status === "published" ? postStatus = "pendente" : postStatus = body.status;
            }
            
        } else if (["editor", "administrador"].includes(admin.role)) {

            if (method === "POST") {
                postStatus = "draft";
            }

            if (method === "PUT") {
                postStatus = body.status;
            };
        }

        // Substitui o status no body da requisição
        req.postStatus = postStatus;
        req.body.userRole = admin.role;

        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error });
    }
}
