import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";

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
            return response.status(404).json({ message: "Administrador não encontrado" });
        }

        if(admin.role === "membro") {
            throw new Error("Você não é um administrador com permissões.")
        }

        request.admin = {
            id: admin.id,
            role: admin.role
        };

        return next();
    } catch (error) {
        console.error("Erro no middleware de autenticação:", error);

        if (error instanceof Error && error.name === "JsonWebTokenError") {
            return response.status(401).json({ message: "Token inválido" });
        }

        return response.status(500).json({ message: "Erro interno do servidor" });
    }
}

export { ensureAdminAuhenticate };
