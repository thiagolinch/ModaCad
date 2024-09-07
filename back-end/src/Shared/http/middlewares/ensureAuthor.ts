import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";
import { AdminRoleRepository } from "../../../Modules/Admins/repositories/implements/AdminRoleRepository";
import { AdminRole } from "../../../Modules/Admins/entity/AdminRole";

interface IPayload {
    sub: string;
    role: string;
};

export async function ensureAuthor(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    const [, token] = authHeader.split(" ");

    try {
        const { sub: admin_id } = verify(token, "88f1c14bd2a14b42fad21d64739889e9") as IPayload;

        const adminRepo = new AdminRepository();
        const roleRepo = new AdminRoleRepository();
        
        const role = "autor"
        const admin = await adminRepo.findById(admin_id);

        if(admin.role != role){
           throw new Error("Administrador não autorizado.").message
        }

        request.admin = {
            id: admin.id,
            role: admin.role
        }

        next()
    } catch(error) {
        console.error("Erro no middleware de autenticação:", error);
        return response.status(401).json({ message: error instanceof Error ? error.message : "Administrador não autorizado." });
    }
}