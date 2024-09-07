import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";


interface IPayload {
    subject: string;
    role: string;
};

async function ensureAdminAuhenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error("Token missing").message
    }

    const [, token] = authHeader.split(" ");

    try {
        const { subject: admin_id } = verify(token, "88f1c14bd2a14b42fad21d64739889e9") as IPayload;


        const adminRepo = new AdminRepository();
        const admin = await adminRepo.findById(admin_id);

        if(!admin){
           throw new Error("Administrador nao encontrado")
        }

        request.admin = {
            id: admin.id,
            role: admin.role
        }

        next()
    } catch(error) {
        console.error("Erro no middleware de autenticação:", error);
        return response.status(401).json({ message: error instanceof Error ? error.message : "Token inválido" });
    }
}

export { ensureAdminAuhenticate }