import { NextFunction, Request, Response } from "express";

import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";



export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const {id} = request.user;
    const adminRepository = new AdminRepository();

    const admin = await adminRepository.findById(id);

    if(!admin.adminPro) {
        throw new Error("You are not an admin!")
    }

    next();
}