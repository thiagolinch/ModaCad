import { getRepository, Repository } from "typeorm";

import { Members } from "../../entities/Members";
import { IMembersRepository, IMembersRepositoryDTO } from "../IMembersRepository";


class MembersRepository implements IMembersRepository {
    private repository: Repository<Members>

    constructor() {
        this.repository = getRepository(Members);
    }
    async listAll(): Promise<Members[]> {
        return await this.repository.find();
    }

    async create({ name, email, password, member_ship }: IMembersRepositoryDTO): Promise<Members> {
        const member =  this.repository.create({
            name,
            email,
            password,
            member_ship
        })

        await this.repository.save(member)

        return member
    };
    async delete(id: string): Promise<void> {
        await this.repository.delete({id})
    }
    async findById(id: string): Promise<Members> {
        return await this.repository.findOne({id})
    }
    async findByEmail(email: string): Promise<Members> {
        return await this.repository.findOne({email})
    }

}

export { MembersRepository }