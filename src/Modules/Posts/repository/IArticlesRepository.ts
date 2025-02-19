import { Admins } from "../../Admins/entity/Admins";
import { Subjects } from "../../Assuntos/entities/Subject";
import { Articles } from "../entity/Articles"
import { Tags } from "../entity/Tags";

interface FindPostParamsDTO {
    type_id?: string;
    page?: number;
    limit?: number;
    status_id?: string;
    subject_id?: string;
    author_id?: string;
    visibility?: string;
    order?: 'ASC' | 'DESC';
}


interface IArticlesRepositoryDTO {
    id?: string;
    title?: string;
    feature_image?: string;
    description?: string;
    content?: string;
    visibility?: string;
    status?: string;
    published_at?: Date | null;
    type?: string;
    tags?: Tags[]; // IDs das tags
    subjects?: Subjects[]; // IDs dos subjects
    admins: Admins[]; // IDs dos admins
    editors?: Admins[];
    curadors?: Admins[];
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
    canonicalUrl?: string;
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
        admins,
        canonicalUrl,
        published_at,
        editors,
        curadors
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
        admins,
        canonicalUrl,
        editors,
        curadors
    }: IArticlesRepositoryDTO): Promise<Articles>;

    findPostByParams(params: FindPostParamsDTO): Promise<{
        posts: Articles[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
    }>;
    postBySubject(params: FindPostParamsDTO): Promise<{
        posts: Articles[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
    }>
    searchPostsByTerm(
        term: string,
        page?: number,
        limit?: number,
        order?: 'ASC' | 'DESC'
    ): Promise<{
        posts: Articles[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;}>;
    findByCanonicalUrl(url: string): Promise<Articles | null>;
    lastPost(): Promise<Articles>;
    findById(id: string): Promise<Articles>;
    findByPostId(post_id: string): Promise<Articles>;
    findByName(name: string): Promise<Articles>

    delete(id: string): Promise<void>;


    maisLidos(params: FindPostParamsDTO, ids: string[]): Promise<{
        posts: Articles[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
    }>;

}

export {IArticlesRepository, IArticlesRepositoryDTO, FindPostParamsDTO}