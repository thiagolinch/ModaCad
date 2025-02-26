import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";

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

async function ensureAdminAuhenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ message: "Token missing" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const { subject: admin_id } = verify(token, "88f1c14bd2a14b42fad21d64739889e9") as IPayload;

        const adminRepo = new AdminRepository();
        const admin = await adminRepo.findById(admin_id);

        if (!admin) {
            throw new Error(CONFIG.ERROR_MESSAGES.TOKEN_MISSING).message;
        }

        if(admin.role === "membro"|| "ex-membro"|| "assinante") {
            throw new Error("Você não é um administrador com permissões.")
        }

        request.admin = {
            id: admin.id,
            role: admin.role
        };

        return next();
    } catch (error) {
        console.error("Erro no middleware de autenticação:", error);

        console.log(error)
        return response.status(401).json({ message: error });
    }
}

export { ensureAdminAuhenticate };
