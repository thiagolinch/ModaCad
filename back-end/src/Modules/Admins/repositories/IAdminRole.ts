import { AdminRole } from "../entity/AdminRole";

interface IAdminRoleDTO {
    name: string,
    description: string
}

interface IAdminRoleRepository {
    create({name, description}: IAdminRoleDTO): Promise<AdminRole>;
    findByName(name: string): Promise<AdminRole>
}

export { IAdminRoleRepository, IAdminRoleDTO }