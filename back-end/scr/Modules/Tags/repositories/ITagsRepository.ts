import { Tags } from "../entities/Tags"


interface ITagsRepository {

    create(): Promise<Tags>;
    findById(id: string): Promise<Tags>;
    create(id: string, name: string): Promise<Tags>;
}

export { ITagsRepository }