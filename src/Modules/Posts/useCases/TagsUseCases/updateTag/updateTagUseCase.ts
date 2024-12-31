import { inject, injectable } from "tsyringe";
import { ITagsRepository, ITagsRepositoryDTO } from "../../../repository/ITagsRepository";
import { Tags } from "aws-sdk/clients/apigateway";

@injectable()
export class UpdateTagUseCase {
    constructor(
        @inject("TagsRepository")
        private repository: ITagsRepository
    ) {}

    async execute(
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
    ): Promise<void> {
        const tag = await this.repository.getById(id)

        if(!tag) {
            throw new Error("Esta tag nao existe, portanto não pode ser atualizada")
        }

        await this.repository.update(
            id,
            name,
            slug,
            description,
            feature_image,
            parent_id,
            visibility,
            og_image,
            og_title,
            og_description,
            twitter_title,
            twitter_image,
            twitter_description,
            meta_title,
            meta_description,
            code_injection_head,
            code_injection_foot,
            cannonical_url,
            accent_color
        )
    }
}