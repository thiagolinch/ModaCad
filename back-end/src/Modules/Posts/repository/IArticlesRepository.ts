import { Admins } from "../../Admins/entity/Admins";
import { Subjects } from "../../Assuntos/entities/Subject";
import { Articles } from "../entity/Articles"
import { Tags } from "../entity/Tags";
import { DeleteFeatureImageController } from "../useCases/PostUseCases/deleteFeatureImage/deleteFeatureImageController";


interface IArticlesRepositoryDTO {
    id?: string;
    title?: string;
    feature_image?: string;
    description?: string;
    content?: string;
    visibility?: string;
    status?: string;
    type?: string;
    tags?: Tags[]; // IDs das tags
    subjects?: Subjects[]; // IDs dos subjects
    admins: Admins[]; // IDs dos admins
    images?: string[];
    meta_id?: string;
    og_image?: string;
    og_title?: string;
    og_description?: string;
    twitter_image?: string;
    twitter_title?: string;
    twitter_description?: string;
    meta_title?: string;
    meta_description?: string;
    email_subject?: string;
    frontmatter?: string;
    feature_image_alt?: string;
    feature_image_caption?: string;
    email_only?: string;

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

    update({
        title,
        feature_image,
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

    updateStatus(adminId: string, post: string): Promise<void>;
    saveMeta(articleId: string, newMetaId: string): Promise<Articles>;

    updateFeatureImage(id: string, feature_image: string): Promise<void>;
    deleteFeatureImageController(id: string): Promise<void>;

    list(): Promise<Articles[]>;
    listPilulas(): Promise<Articles[]>;
    listTextos(): Promise<Articles[]>;

    findPostByParams(type_id: string, page: number, limit: number, author_id?: string, status_id?: string): Promise<Articles[]>
    findById(id: string): Promise<Articles>;
    findByPostId(post_id: string): Promise<Articles>;
    findByName(name: string): Promise<Articles>

    delete(id: string): Promise<void>;

}

export {IArticlesRepository, IArticlesRepositoryDTO}