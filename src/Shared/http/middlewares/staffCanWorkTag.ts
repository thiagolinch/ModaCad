import { NextFunction, Request, Response } from "express";

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

export async function staffCanWorkTag(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const admin = req.admin;

    try {
        admin.role === "editor" || "administrador" ? next() : res.status(401).json({ message: "Você não tem permissão para realizar essa ação." });
    } catch (error) {
        console.error("Erro no middleware staffCanWorkTag:", error);

        console.log(error)
        return res.status(401).json({ message: error });
        
    }
}