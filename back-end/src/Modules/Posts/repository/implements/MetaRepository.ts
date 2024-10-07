import { IsEnabled } from "aws-sdk/clients/s3";
import { Meta } from "../../entity/Meta";
import { IMetaRepository, IMetaRepositoryDTO } from "../IMetaRepository";
import { getRepository, Repository } from "typeorm";


export class MetaRepository implements IMetaRepository {
    private repository: Repository<Meta>

    constructor() {
        this.repository = getRepository(Meta)
    }
    async getbyPostId(post_id: string): Promise<Meta> {
        return await this.repository.findOne({post_id})
    }
    async getById(id: string): Promise<Meta> {
        return await this.repository.findOne({id})
    }
    async create(data: IMetaRepositoryDTO): Promise<Meta> {
        const meta = this.repository.create(data)

        await this.repository.save(meta)

        return meta
    }
    async update(
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
    ): Promise<Meta> {
        const meta = await this.repository.findOne({id})

        if(og_image) {
            meta.og_image = og_image
        }

        if(og_title) {
            meta.og_title = og_title
        }

        if(og_description) {
            meta.og_description = og_description
        }

        if(twitter_image) {
            meta.twitter_image = twitter_image
        }

        if(twitter_title) {
            meta.twitter_title = twitter_title
        }

        if(twitter_description) {
            meta.twitter_description = twitter_description
        }

        if(meta_title) {
            meta.meta_title = meta_title
        }

        if(meta_description) {
            meta.meta_description = meta_description
        }
        
        if(email_subject) {
            meta.email_subject = email_subject
        }

        if(frontmatter) {
            meta.frontmatter = frontmatter
        }

        if(feature_image_alt) {
            meta.feature_image_alt = feature_image_alt
        }

        if(feature_image_caption) {
            meta.feature_image_caption = feature_image_caption
        }

        if(email_only) {
            meta.email_only = email_only
        }

        await this.repository.save(meta)

        return meta
    }
    async save(meta: Meta): Promise<Meta> {
        // Salva o objeto Meta no banco de dados
        const savedMeta = await this.repository.save(meta);
        return savedMeta; // Retorna o Meta salvo
    }

}