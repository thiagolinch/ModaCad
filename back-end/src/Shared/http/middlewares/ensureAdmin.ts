import { NextFunction, Request, Response } from "express";

import { AdminRepository } from "../../../Modules/Admins/repositories/implements/AdminsRepository";



export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const {id} = request.user;
    const adminRepository = new AdminRepository();
    const admin_role = "4cc875a9-c037-4c23-bbbe-1adf1627e4b9"

    const admin = await adminRepository.findById(id)

    if(admin.admin_role_id != admin_role) {
        throw new Error("You are not an admin!")
    }

    next();
}