import { Admins } from "../../Admins/entity/Admins";
import { Articles } from "../entity/Articles"


interface IArticlesRepositoryDTO {
    id?: string;
    title: string;
    description: string;
    content: string;
    visibility: string;
    type: string;
    status: string;
    tags?: string[];
    subjects?: string[],
    images?: string[]
    admin?: Admins;
    created_at?: Date;
    updated_at?: Date;

}

interface IArticlesRepository {
    create({
        title,
        description,
        content,
        visibility,
        status,
        type,
        tags,
        subjects,
        images,
        admin
    }: IArticlesRepositoryDTO): Promise<Articles>;

    save(data: IArticlesRepositoryDTO): Promise<Articles>;

    update(
        id: string,
        status?: string,
        visibility?: string,
        type?: string,
        title?: string,
        description?: string,
        content?: string,
        tags?: string[],
        subjects?: string[],
        images?: string[],
        status?: string,
    ): Promise<Articles>;

    updateStatus(adminId: string, post: string): Promise<void>;

    list(): Promise<Articles[]>;
    listPilulas(): Promise<Articles[]>;
    listTextos(): Promise<Articles[]>;

    findPostByParams(type_id: string,author_id?: string, status_id?: string): Promise<Articles[]>
    findById(id: string): Promise<Articles>;
    findByName(name: string): Promise<Articles>

    delete(id: string): Promise<void>;

}

export {IArticlesRepository, IArticlesRepositoryDTO}