import { getRepository, Repository } from "typeorm";
import { AdminRole } from "../../entity/AdminRole";
import { IAdminRoleRepository, IAdminRoleDTO } from "../IAdminRole";


class AdminRoleRepository implements IAdminRoleRepository {
    private repository: Repository<AdminRole>

    constructor() {
        this.repository = getRepository(AdminRole)
    }


    create({ name, description }: IAdminRoleDTO): Promise<AdminRole> {
        throw new Error("Method not implemented.").message
    }
    async findByName(name: string): Promise<AdminRole> {
        return await this.repository.findOne({name})
    }

}

export { AdminRoleRepository }