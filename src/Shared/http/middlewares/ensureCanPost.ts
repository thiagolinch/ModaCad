import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";

interface IPayload {
    subject: string;
    role: string;
};

export async function ensureAdminCanPost(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    const [, token] = authHeader.split(" ");

    try {
        const { subject: adminId } = verify(token, "88f1c14bd2a14b42fad21d64739889e9") as IPayload;

        const adminRepo = new AdminRepository();
        
        const admin = await adminRepo.findById(adminId);

        if(admin.role == "colaborador"){
            throw new Error("Administrador nao autorizado")           
        }
        
        next()
    } catch (error) {
        console.error("Erro no middleware de autenticação:", error);

        if (error instanceof Error && error.name === "JsonWebTokenError") {
            return response.status(401).json({ message: "Token inválido" });
        }

        return response.status(500).json({ message: "Erro interno do servidor" });
    }
}