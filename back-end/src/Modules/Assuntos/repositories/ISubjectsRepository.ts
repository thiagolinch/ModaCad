import { Subjects } from "../entities/Subject"

interface ISubjectsRepositoryDTO {
    id?: string,
    name: string
}


interface ISubjectsRepository {

    create(name: string): Promise<Subjects>;
    delete(name: string): Promise<void>;
    findById(id: string): Promise<Subjects>;
    findByIds(ids: string[]): Promise<Subjects[]>;
    findByName(name: string): Promise<Subjects>;
    updateTag(id: string, name: string): Promise<void>;
    listTags(): Promise<Subjects[]>;
}

export { ISubjectsRepository, ISubjectsRepositoryDTO }