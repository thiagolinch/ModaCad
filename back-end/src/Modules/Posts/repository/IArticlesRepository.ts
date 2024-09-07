import { Articles } from "../entity/Articles"


interface IArticlesRepositoryDTO {
    id?: string;
    title: string;
    description: string;
    content: string;
    visibility: string;
    type: string;
    status: string;
    admin: string;
    tags?: string[];
    subjects?: string[]
}

interface IArticlesRepository {
    create({
        title,
        description,
        content,
        visibility,
        status,
        type,
        admin,
        tags,
        subjects
    }: IArticlesRepositoryDTO): Promise<Articles>;

    update({
        title,
        description,
        content,
        visibility,
        type,
        admin,
        tags,
        subjects 
    }: IArticlesRepositoryDTO): Promise<Articles>;

    updateStatus(admin: string, post: string): Promise<void>;

    list(): Promise<Articles[]>;
    listPilulas(): Promise<Articles[]>;
    listTextos(): Promise<Articles[]>;

    findTextByStatus(status_id: string): Promise<Articles[]>
    findPilulasByStatus(status_id: string): Promise<Articles[]>
    findById(id: string): Promise<Articles>;
    findByName(name: string): Promise<Articles>

    delete(id: string): Promise<void>;

}

export {IArticlesRepository, IArticlesRepositoryDTO}