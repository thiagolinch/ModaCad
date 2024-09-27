import { Tags } from "../entity/Tags";

interface ITagsRepositoryDTO {
    id?: string;
    name: string;
    slug?: string;
    description?: string;
    feature_image?: string;
    parent_id?: string;
    visibility?: string;
    og_image?: string;
    og_title?: string;
    og_description?: string;
    twitter_title?: string;
    twitter_image?: string;
    twitter_description?: string;
    meta_title?: string;
    meta_description?: string;
    code_injection_head?: string;
    code_injection_foot?: string;
    cannonical_url?: string;
    accent_color?: string;
    created_at?: Date;
    updated_at?: Date;
}

interface ITagsRepository {
    create(data: ITagsRepositoryDTO): Promise<Tags>;
    delete(id: string): Promise<void>;
    list(): Promise<Tags[]>;
    getById(id: string): Promise<Tags>;
    update(
        id: string,
        name: string,
        slug?: string,
        description?: string,
        feature_image?: string,
        parent_id?: string,
        visibility?: string,
        og_image?: string,
        og_title?: string,
        og_description?: string,
        twitter_title?: string,
        twitter_image?: string,
        twitter_description?: string,
        meta_title?: string,
        meta_description?: string,
        code_injection_head?: string,
        code_injection_foot?: string,
        cannonical_url?: string,
        accent_color?: string
    ): Promise<Tags>;
}

export { ITagsRepository, ITagsRepositoryDTO }