import { getRepository, Repository } from "typeorm";
import { Tags } from "../../entity/Tags";
import { ITagsRepository, ITagsRepositoryDTO } from "../ITagsRepository";


export class TagsRepository implements ITagsRepository {
    private repository: Repository<Tags>

    constructor() {
        this.repository = getRepository(Tags)
    }

    async create(data: ITagsRepositoryDTO): Promise<Tags> {
        const tag = this.repository.create(data)

        await this.repository.save(tag)

        return tag
    }

    
    async delete(id: string): Promise<void> {
        await this.repository.delete({id})
    }

    async list(): Promise<Tags[]> {
        return await this.repository.find({ order: {name: "ASC"}})
    }

    async getById(id: string): Promise<Tags> {
        return await this.repository.findOne({id})
    };

    async findByIds(îds: string[]): Promise<Tags[]> {
        const tags = await this.repository.findByIds(îds)
        return tags;
    };

    async update(
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
    ): Promise<Tags> {
        const tag = await this.repository.findOne({id})

        if(name) {
            tag.name = name
        }

        if(slug) {
            tag.slug = slug
        }

        if(description) {
            tag.description = description
        }

        if(feature_image) {
            tag.feature_image = feature_image
        }

        if(parent_id) {
            tag.parent_id = parent_id
        }

        if(visibility) {
            tag.visibility = visibility
        }

        if(og_image) {
            tag.og_image = og_image
        }

        if(og_title) {
            tag.og_title = og_title
        }

        if(og_description) {
            tag.og_description = og_description
        }

        if(twitter_title) {
            tag.twitter_title = twitter_title
        }

        if(twitter_image) {
            tag.twitter_image = twitter_image
        }

        if(twitter_description) {
            tag.twitter_description = twitter_description
        }

        if(meta_title) {
            tag.meta_title = meta_title
        }

        if(meta_description) {
            tag.meta_description = meta_description
        }

        if(code_injection_head) {
            tag.code_injection_head = code_injection_head
        }

        if(code_injection_foot) {
            tag.code_injection_foot = code_injection_foot
        }

        if(cannonical_url) {
            tag.cannonical_url = cannonical_url
        }

        if(accent_color) {
            tag.accent_color = accent_color
        }

        await this.repository.save(tag)

        return tag;
    }
}