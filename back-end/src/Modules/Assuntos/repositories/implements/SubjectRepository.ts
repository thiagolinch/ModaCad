import { getRepository, Repository } from "typeorm";

import { ISubjectsRepository, ISubjectsRepositoryDTO } from "../ISubjectsRepository";
import { Subjects } from "../../entities/Subject";

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
    
    async findById(id: string): Promise<Subjects> {
        return await this.repository.findOne({id})
    }

    async findByName(name: string): Promise<Subjects> {
        return await this.repository.findOne({name})
    }

    async create(name: string, sort: number): Promise<Subjects> {
        const tag = this.repository.create({name, sort});
        
        await this.repository.save(tag)

        return tag;
    }

   /*  async findById(id: string): Promise<Subjects> {
        return await this.repository.findOne({id})
    } */

    async updateTag(id: string, name: string, sort: number): Promise<void> {
        const subject = await this.repository.findOne({id})

        if (name) {
            subject.name = name
        }

        if ( sort ) {
            subject.sort = sort
        }

        await this.repository.save(subject)
    }

}

export { SubjectRepository }