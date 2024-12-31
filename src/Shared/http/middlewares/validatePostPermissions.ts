import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";
import { AdminRoleRepository } from "../../../Modules/Admins/repositories/implements/AdminRoleRepository";

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
}

export async function validatePostPermissions(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

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

        const admin = await adminRepo.findById(userId);
        if (!admin) {
            return res.status(404).json({ message: CONFIG.ERROR_MESSAGES.USER_NOT_FOUND });
        }

        const role = await adminRoleRepo.findByName(admin.role);
        console.log("role name: ", role.name)
        if (!role) {
            return res.status(404).json({ message: CONFIG.ERROR_MESSAGES.ROLE_NOT_FOUND });
        }

        // Lógica de definição de status do post
        const action = req.body.status; // Recebido da API
        let postStatus = "draft"; // Valor padrão

        if (["autor", "curador"].includes(role.name) && action === "published") {
            return res.status(400).json({message: CONFIG.ERROR_MESSAGES.USER_NOT_ALLOWED})
        } else if (["editor", "administrador"].includes(role.name) && action === "published") {
            postStatus = "published";
        }

        // Substitui o status no body da requisição
        req.postStatus = postStatus;
        req.body.userRole = role.name; // Passa o cargo para o controller também, se necessário

        next();
    } catch (error) {
        return res.status(401).json({ message: CONFIG.ERROR_MESSAGES.TOKEN_INVALID });
    }
}
