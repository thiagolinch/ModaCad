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
        throw new Error("Token missing")
    }

    const [, token] = authHeader.split(" ");


    try {
        const { sub: user_id } = verify(token, "88f1c14bd2a14b42fad21d64739889e9") as IPayload;

        const userRepo = new MembersRepository()
        const user = await userRepo.findById(user_id)

        if(!user){
            throw new Error("User does not exists")
        }

        request.user = {
            id: user.id
        }

        next()
    } catch {
        throw new Error("Invalid token")
    }
}

export { ensureUserAuthenticate }