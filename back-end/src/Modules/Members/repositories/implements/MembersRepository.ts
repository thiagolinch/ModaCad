import { getRepository, Repository } from "typeorm";

import { Members } from "../../entities/Members";
import { IMembersRepository, IMembersRepositoryDTO } from "../IMembersRepository";


class MembersRepository implements IMembersRepository {
    private repository: Repository<Members>

    constructor() {
        this.repository = getRepository(Members);
    }

    async create({ name, email, password }: IMembersRepositoryDTO): Promise<Members> {
        const member =  this.repository.create({
            name,
            email,
            password
        })

        await this.repository.save(member)

        return member
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete({id})
    }
    findById(id: string): Promise<Members> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<Members> {
        return await this.repository.findOne({email})
    }

}

export { MembersRepository }