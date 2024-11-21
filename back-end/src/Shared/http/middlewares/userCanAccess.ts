import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";
import { ArticleRepository } from "../../../Modules/Posts/repository/implements/ArticlesRepository";

interface IPayload {
    subject: string;
    role: string;
    plan: string;
}

async function userCanAccess(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    const postId = request.params;

    if (!authHeader) {
        return response.status(401).json({ message: "Token missing" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const { subject: admin_id } = verify(token, "88f1c14bd2a14b42fad21d64739889e9") as IPayload;

        const adminRepo = new AdminRepository();
        const admin = await adminRepo.findById(admin_id);

        if (!admin) {
            return response.status(404).json({ message: "Administrador não encontrado" });
        }

        const access = admin.role;
        
        const postRepo = new ArticleRepository()
        const post = await postRepo.findById(postId.id)

        if(admin.role === 'administrador') {
            request.admin = {
                id: admin.id,
                role: admin.role,
                plan: admin.plans.title
            };

            return next();
        }

        if(post.visibility === 'publico') {
            request.admin = {
                id: admin.id,
                role: admin.role,
                plan: admin.plans.title
            };

            return next();
        }

        if(post.visibility === access) {
            request.admin = {
                id: admin.id,
                role: admin.role,
                plan: admin.plans.title
            };

            return next();
        } else {
            throw new Error("Para visualizar este post mude para o plano Pago.").message
        }



    } catch (error) {
        console.error("Erro no middleware de autenticação:", error);

        if (error instanceof Error && error.name === "JsonWebTokenError") {
            return response.status(401).json({ message: "Token inválido" });
        }

        return response.status(500).json({ message: error});
    }
}

export { userCanAccess };
