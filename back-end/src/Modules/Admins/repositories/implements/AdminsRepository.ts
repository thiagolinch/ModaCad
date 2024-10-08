import { getRepository, Repository } from "typeorm";
import { Admins } from "../../entity/Admins";
import { IAdminsRepository, IAdminsRepositoryDTO } from "../IAdminsRepository";




class AdminRepository implements IAdminsRepository {
    private repository: Repository<Admins>

    constructor() {
        this.repository = getRepository(Admins);
    }
    async findStaff(): Promise<Admins[]> {
        return await this.repository
        .createQueryBuilder("admin")
        .select([
            "admin.id",
            "admin.name",
            "admin.role",
            "admin.email",
            "admin.avatar"
        ])
        .where("admin.role != :role", { role: 'member' })
        .getMany();
    }
    async findByIds(id: string[]): Promise<Admins[]> {
        return await this.repository.findByIds(id)
    }

    async update(
        id: string,
        name: string,
        cellphone: string,
        email: string,
        role: string,
        status_id: string,
        plan_id: string
    ): Promise<void> {
        const user = await this.repository.findOne({id})

        if(name) {
            user.name = name
        }
        if(cellphone) {
            user.cellphone = cellphone
        }
        if(email){
            const emailExist = await this.repository.findOne({email})
            if(emailExist){
                throw new Error("E-mail ja cadastrado.").message
            }   
            user.email = email
        }
        if(role){
            user.role = role
        }       
        if(status_id) {
            user.status = status_id
        }
        if(plan_id){
            user.plan = plan_id
        }

        await this.repository.save(user)
    }

    async listUsers(role: string, status_id?: string, plan_id?: string): Promise<Admins[]> {
        const userQuery = this.repository.createQueryBuilder("u")
        .select([
            "u.id",
            "u.name",
            "u.email",
            "u.avatar",
            "u.role",
            "u.cellphone"
        ])
        .where("u.role = :role", {role})

        if(status_id) {
            userQuery.andWhere("u.status = :status_id", {status_id})
        }

        if(plan_id) {
            userQuery.andWhere("u.plan = :plan_id", { plan_id })
        }

        const users = userQuery.getMany()
        return users
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

    async findByEmail(email: string): Promise<Admins> {
        return await this.repository.findOne({email})
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({id})
    }

}

export { AdminRepository }