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

export async function staffCanEdit(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const admin = req.admin;
    const post = req.article;

    try {
        
        if (post.status === "published" && (admin.role !== "administrador" && admin.role !== "editor")) {
            throw new Error(CONFIG.ERROR_MESSAGES.USER_NOT_ALLOWED);
        }
        
        next();
    } catch (error) {
        console.log("Erro no mid. staffCanEdit: ", error);

        return res.status(400).json({ message: error })
    }
}