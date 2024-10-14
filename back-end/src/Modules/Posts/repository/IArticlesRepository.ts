import { Admins } from "../../Admins/entity/Admins";
import { Subjects } from "../../Assuntos/entities/Subject";
import { Articles } from "../entity/Articles"
import { Tags } from "../entity/Tags";


interface IArticlesRepositoryDTO {
    id?: string;
    title?: string;
    feature_image?: string;
    description?: string;
    content?: string;
    visibility?: string;
    status?: string;
    published_at?: Date;
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

    update({
        title,
        feature_image,
        description,
        content,
        visibility,
        status,
        published_at,
        type,
        tags,
        subjects,
        images,
        admins
    }: IArticlesRepositoryDTO): Promise<Articles>;

    findPostByParams(
        type_id: string,
        page: number,
        limit: number,
        author_id?: string,
        status_id?: string,
        order?: string
    ): Promise<{
        posts: Articles[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
    }>;
    lastPost(): Promise<Articles>;
    findById(id: string): Promise<Articles>;
    findByPostId(post_id: string): Promise<Articles>;
    findByName(name: string): Promise<Articles>

    delete(id: string): Promise<void>;

}

export {IArticlesRepository, IArticlesRepositoryDTO}