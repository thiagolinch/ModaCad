import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";

import { MembersRepository } from "../../../Modules/Members/repositories/implements/MembersRepository";


interface IPayload {
    sub: string;
};

async function ensureUserAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error("Token missing").message
    }

    const [, token] = authHeader.split(" ");


    try {
        const { sub: user_id } = verify(token, "88f1c14bd2a14b42fad21d64739889e9") as IPayload;

        const userRepo = new MembersRepository()
        const user = await userRepo.findById(user_id)

        if(!user){
            throw new Error("User does not exists").message
        }

        request.user = {
            id: user.id
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

export { ensureUserAuthenticate }