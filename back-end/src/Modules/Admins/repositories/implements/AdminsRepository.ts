import { getRepository, Repository } from "typeorm";
import { Admins } from "../../entity/Admins";
import { IAdminsRepository, IAdminsRepositoryDTO } from "../IAdminsRepository";




class AdminRepository implements IAdminsRepository {
    private repository: Repository<Admins>

    constructor() {
        this.repository = getRepository(Admins);
    }
    async create({ name, cellphone, email, password, adminPro }: IAdminsRepositoryDTO): Promise<Admins> {
        const admin =  this.repository.create({
            name,
            email,
            password,
            cellphone,
            adminPro
        })

        await this.repository.save(admin)

        return admin
    }
    async findById(id: string): Promise<Admins> {
        return await this.repository.findOne({id})
    }
    upgradeToPro(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<Admins> {
        return await this.repository.findOne({email})
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete({id})
    }

}

export { AdminRepository }