import { getRepository, Repository } from "typeorm";
import { Admins } from "../../entity/Admins";
import { IAdminsRepository, IAdminsRepositoryDTO } from "../IAdminsRepository";




class AdminRepository implements IAdminsRepository {
    private repository: Repository<Admins>

    constructor() {
        this.repository = getRepository(Admins);
    }
    async updateAvatar({ id, name, cellphone, email, password, role, avatar }: IAdminsRepositoryDTO): Promise<void> {
        await this.repository
        .createQueryBuilder()
        .update()
        .set({avatar})
        .where("id = :id")
        .setParameters({id})
        .execute();
    }

    
    async listAll(): Promise<Admins[]> {
        return await this.repository.find()
    }
    async create({ name, cellphone, email, password, role, avatar }: IAdminsRepositoryDTO): Promise<Admins> {
        const admin =  this.repository.create({
            name,
            email,
            password,
            cellphone,
            role,
            avatar
        });

        await this.repository.save(admin);

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