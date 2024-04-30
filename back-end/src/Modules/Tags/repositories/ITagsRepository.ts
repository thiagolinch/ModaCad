import { Tags } from "../entities/Tags"

interface ITagsRepositoryDTO {
    id?: string,
    name: string
}


interface ITagsRepository {

    create(name: string): Promise<Tags>;
    findById(id: string): Promise<Tags>;
    findByName(name: string): Promise<Tags>;
    updateTag(id: string, name: string): Promise<void>;
}

export { ITagsRepository, ITagsRepositoryDTO }