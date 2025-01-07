import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AdminRoleRepository } from "../../../Modules/Admins/repositories/implements/AdminRoleRepository";
import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";
import { Articles } from "../../../Modules/Posts/entity/Articles";
import { ArticleRepository } from "../../../Modules/Posts/repository/implements/ArticlesRepository";

const CONFIG = {
    TOKEN_SECRET: "88f1c14bd2a14b42fad21d64739889e9",
    ERROR_MESSAGES: {
        TOKEN_MISSING: "Token ausente",
        TOKEN_INVALID: "Token invalido",
        USER_NOT_FOUND: "Usuario nao encontrado",
        USER_NOT_ALLOWED: "Usuario sem permissao"
    }
};

interface IPayload {
    subject: string;
}

export async function validadeUserPermission( req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const {id} = req.params;

    
    try {

        const postRepo = new ArticleRepository();

        let post: Articles | null = null;
        let postVisibility = ""; // Valor padrão para posts novos

        if (id) {
            post = await postRepo.findById(id);
            if (!post) {
                return res.status(404).json({ message: "Post não encontrado" });
            }
            postVisibility = post.visibility;
            console.log("Visibilidade: ", postVisibility)
        }

        if(!authHeader) {
            if(post && post.visibility === 'publico') {
                return next();
            }
            return res.status(401).json({ message: CONFIG.ERROR_MESSAGES.TOKEN_MISSING})    
        }        

        const [, token] = authHeader.split(" ");

        // Verifica o token
        const { subject: userId } = verify(token, CONFIG.TOKEN_SECRET) as IPayload;

        const userRepo = new AdminRepository();
        const user = await userRepo.findById(userId);

        if (!user) {
            return res.status(404).json({ message: CONFIG.ERROR_MESSAGES.USER_NOT_FOUND });
        }

        const roleRepo = new AdminRoleRepository();
        const role = await roleRepo.findByName(user.role)

        if (!role) {
            return res.status(403).json({ message: CONFIG.ERROR_MESSAGES.USER_NOT_ALLOWED });
        }        
        console.log("User role: ", role.name)

        // Verificação para Staff
        const staffRoles = ['administrador', 'editor', 'curador', 'autor'];
        if (staffRoles.includes(role.name)) {
            return next();
        }
        console.log("status: ",user.status_id.name)

        // Verificação para usuários padrão
        if (postVisibility === "publico") {
            return next(); // Acesso permitido
        }

        if (postVisibility === "assinantes" && user.status_id.name === "ativo") {
            return next(); // Apenas assinantes ativos podem acessar
        }

        if (postVisibility === "membros" && user.status_id.name === "ativo") {
            return next(); // Membros com conta ativa podem acessar
        }

        return res.status(403).json({ message: CONFIG.ERROR_MESSAGES.USER_NOT_ALLOWED });

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: CONFIG.ERROR_MESSAGES.TOKEN_INVALID, error });
    }
}