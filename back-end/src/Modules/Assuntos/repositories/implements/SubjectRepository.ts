import { getRepository, Repository } from "typeorm";

import { ISubjectsRepository, ISubjectsRepositoryDTO } from "../ISubjectsRepository";
import { Subjects } from "../../entities/Tags";

class SubjectRepository implements ISubjectsRepository {

    private repository: Repository<Subjects>

    constructor() {
        this.repository = getRepository(Subjects)
    }
    async findByIds(ids: string[]): Promise<Subjects[]> {
        const subjects = await this.repository.findByIds(ids)
        return subjects
    }

    async listTags(): Promise<Subjects[]> {
        return await this.repository.find()
    }

    async delete(name: string): Promise<void> {
         await this.repository.delete({name})
    }
    
    findById(id: string): Promise<Subjects> {
        throw new Error("Method not implemented.");
    }

    async findByName(name: string): Promise<Subjects> {
        return await this.repository.findOne({name})
    }

    async create(name: string): Promise<Subjects> {
        const tag = this.repository.create({name});
        

        await this.repository.save(tag)

        return tag;
    }

   /*  async findById(id: string): Promise<Subjects> {
        return await this.repository.findOne({id})
    } */

    async updateTag(id: string, name: string): Promise<void> {
        await this.repository
        .createQueryBuilder()
        .update()
        .set({name})
        .where("id = :id")
        .setParameters({id})
        .execute();
    }

}

export { SubjectRepository }