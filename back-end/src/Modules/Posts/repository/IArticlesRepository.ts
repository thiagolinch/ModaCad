import { Admins } from "../../Admins/entity/Admins";
import { Subjects } from "../../Assuntos/entities/Subject";
import { Articles } from "../entity/Articles"
import { Tags } from "../entity/Tags";
import { DeleteFeatureImageController } from "../useCases/PostUseCases/deleteFeatureImage/deleteFeatureImageController";


interface IArticlesRepositoryDTO {
    id?: string;
    title?: string;
    description?: string;
    content?: string;
    visibility?: string;
    status?: string;
    type?: string;
    tags?: Tags[]; // IDs das tags
    subjects?: Subjects[]; // IDs dos subjects
    admins: Admins[]; // IDs dos admins
    images?: string[]
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
        admins
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
    ): Promise<Articles>;

    updateStatus(adminId: string, post: string): Promise<void>;

    updateFeatureImage(id: string, feature_image: string): Promise<void>;
    deleteFeatureImageController(id: string): Promise<void>;

    list(): Promise<Articles[]>;
    listPilulas(): Promise<Articles[]>;
    listTextos(): Promise<Articles[]>;

    findPostByParams(type_id: string,author_id?: string, status_id?: string): Promise<Articles[]>
    findById(id: string): Promise<Articles>;
    findByPostId(post_id: string): Promise<Articles>;
    findByName(name: string): Promise<Articles>

    delete(id: string): Promise<void>;

}

export {IArticlesRepository, IArticlesRepositoryDTO}