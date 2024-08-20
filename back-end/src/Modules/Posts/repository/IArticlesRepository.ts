import { Articles } from "../entity/Articles"


interface IArticlesRepositoryDTO {
    id?: string;
    title: string;
    slug: string;
    html: string;
    subjects_id: string[];
    feature_image: string;
    visibility: string;
    type: string;
    status: string;
    show_title_and_feature_image: string;
    plaintext: string;
    admin_id: string;
    comments_id?: string;
}

interface IArticlesRepository {
    create({
        title,
        slug,
        subjects_id ,
        html,
        feature_image,
        visibility,
        show_title_and_feature_image,
        status,
        type,
        plaintext,
        admin_id,
        comments_id}: IArticlesRepositoryDTO): Promise<Articles>
    list(): Promise<Articles[]>;
    listPilulas(): Promise<Articles[]>;
    listTextos(): Promise<Articles[]>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Articles>;

    findByName(name: string): Promise<Articles>
}

export {IArticlesRepository, IArticlesRepositoryDTO}