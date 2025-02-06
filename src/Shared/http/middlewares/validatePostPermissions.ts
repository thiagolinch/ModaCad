import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";
import { AdminRoleRepository } from "../../../Modules/Admins/repositories/implements/AdminRoleRepository";
import { ArticleRepository } from "../../../Modules/Posts/repository/implements/ArticlesRepository";
import { Articles } from "Modules/Posts/entity/Articles";

const CONFIG = {
    TOKEN_SECRET: "88f1c14bd2a14b42fad21d64739889e9",
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
    const authHeader = req.headers.authorization;
    const {id} = req.params;

    if (!authHeader) {
        return res.status(401).json({ message: CONFIG.ERROR_MESSAGES.TOKEN_MISSING });
    }

    const [, token] = authHeader.split(" ");
    try {
        // Verifica o token
        const { subject: userId } = verify(token, CONFIG.TOKEN_SECRET) as IPayload;

        // Busca informações do usuário
        const adminRepo = new AdminRepository();
        const adminRoleRepo = new AdminRoleRepository();

        // Busca info do post se ja existente
        const postRepo = new ArticleRepository();

        const admin = await adminRepo.findById(userId);
        if (!admin) {
            return res.status(404).json({ message: CONFIG.ERROR_MESSAGES.USER_NOT_FOUND });
        }

        const role = await adminRoleRepo.findByName(admin.role);
        console.log("role name: ", role.name)
        if (!role) {
            return res.status(404).json({ message: CONFIG.ERROR_MESSAGES.ROLE_NOT_FOUND });
        }

        let post: Articles;

        if(id) {
            post = await postRepo.findById(id)
        }

        // Lógica de definição de status do post
        let postStatus = post?.status || ""; // Default status
        const method = req.method;

        // Verifica permissões e métodos
        if (["autor", "curador"].includes(role.name)) {
            if (method === "POST") {
                postStatus = "draft"; // Criação sempre como rascunho
            }

            if (method === "PATCH") {
                postStatus = role.name === "autor" ? "pendente: curador" : "pendente: editor";
            }

            if (method === "PUT") {
                console.log(body.status)
                if (body.status === "published") {
                    postStatus = role.name === "autor" ? "pendente: curador" : "pendente: editor";
                }

                if (body?.status === "draft" || (post?.status === "pendente: curador" && role.name === "curador")) {
                    next();
                    return;
                }
            }

            if (method === "DELETE") {
                return res.status(403).json({ message: CONFIG.ERROR_MESSAGES.USER_NOT_ALLOWED });
            }
            
        } else if (["editor", "administrador"].includes(role.name)) {
            if (method === "POST") {
                postStatus = "draft";
            }

            if (method === "PATCH") {
                ;body?.status === 'published' ? postStatus = 'pendente: editor' : postStatus = 'published'
            }

            if (method === "PUT") {
                next();
                return;
            }

            if (method === "DELETE" && role.name === "editor") {
                return res.status(403).json({ message: CONFIG.ERROR_MESSAGES.USER_NOT_ALLOWED });
            }
        }

        // Substitui o status no body da requisição
        req.postStatus = postStatus;
        req.body.userRole = role.name;

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: CONFIG.ERROR_MESSAGES.TOKEN_INVALID, error });
    }
}
