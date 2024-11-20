import { Subjects } from "../entities/Subject"

interface ISubjectsRepositoryDTO {
    id?: string,
    name: string,
    sort: number
}


interface ISubjectsRepository {

    create(name: string, sort: number): Promise<Subjects>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Subjects>;
    findByIds(ids: string[]): Promise<Subjects[]>;
    findByName(name: string): Promise<Subjects>;
    updateTag(id: string, name: string, sort: number): Promise<void>;
    listTags(): Promise<Subjects[]>;
}

export { ISubjectsRepository, ISubjectsRepositoryDTO }