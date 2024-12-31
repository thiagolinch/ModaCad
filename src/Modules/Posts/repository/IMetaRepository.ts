import { IsEnabled } from "aws-sdk/clients/s3";
import { Meta } from "../entity/Meta";


interface IMetaRepositoryDTO {
    id?: string;
    post_id: string;
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

interface IMetaRepository {
    create(data: IMetaRepositoryDTO): Promise<Meta>;
    update(
        id: string,
        og_image?: string,
        og_title?: string,
        og_description?: string,
        twitter_image?: string,
        twitter_title?: string,
        twitter_description?: string,
        meta_title?: string,
        meta_description?: string,
        email_subject?: string,
        frontmatter?: string,
        feature_image_alt?: string,
        feature_image_caption?: string,
        email_only?: string
    ): Promise<Meta>;
    save(meta: Meta): Promise<Meta>;
    getbyPostId(post_id: string): Promise<Meta>;
    getById(id: string): Promise<Meta>;
}

export { IMetaRepository, IMetaRepositoryDTO }