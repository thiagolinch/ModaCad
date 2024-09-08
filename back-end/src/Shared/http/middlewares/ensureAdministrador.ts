import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";
import { AdminRoleRepository } from "../../../Modules/Admins/repositories/implements/AdminRoleRepository";
import { AdminRole } from "../../../Modules/Admins/entity/AdminRole";

interface IPayload {
    subject: string;
    role: string;
};

export async function ensureAdministrador(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    const [, token] = authHeader.split(" ");

    try {
        const { subject: adminId } = verify(token, "88f1c14bd2a14b42fad21d64739889e9") as IPayload;

        const adminRepo = new AdminRepository();
        const roleRepo = new AdminRoleRepository();
        
        const admin = await adminRepo.findById(adminId);

        if(admin.role != "administrador"){
            throw new Error("Administrador nao autorizado").message           
        }
        
        next()
    } catch(error) {
        console.error("Erro no middleware de autenticação:", error);
        return response.status(401).json({ message: error instanceof Error ? error.message : "Token inválido" });
    }
}