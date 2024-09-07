import { getRepository, Repository } from "typeorm";

import { Members } from "../../entities/Members";
import { IMembersRepository, IMembersRepositoryDTO } from "../IMembersRepository";


class MembersRepository implements IMembersRepository {
    private repository: Repository<Members>

    constructor() {
        this.repository = getRepository(Members);
    }
    async list( status_id: string, plan_id: string ): Promise<Members[]> {
        const memberQuery = this.repository.createQueryBuilder("m").where("m.plan = :plan", { plan: plan_id }).andWhere("m.status = :status", { status: status_id })
        const members = memberQuery.getMany()

        return members
    }

    async create({ name, email, password, plan }: IMembersRepositoryDTO): Promise<Members> {
        const member =  this.repository.create({
            name,
            email,
            password,
            plan
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