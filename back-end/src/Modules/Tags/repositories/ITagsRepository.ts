import { Tags } from "../entities/Tags"


interface ITagsRepository {

    create(): Promise<Tags>;
    findById(id: string): Promise<Tags>;
    updateTag(id: string, name: string): Promise<void>;
}

export { ITagsRepository }