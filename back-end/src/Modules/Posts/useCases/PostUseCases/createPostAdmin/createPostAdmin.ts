import { inject, injectable } from "tsyringe";
import { IArticlesRepository } from "../../../repository/IArticlesRepository";
import { IAdminsRepository } from "../../../../Admins/repositories/IAdminsRepository";
import { Articles } from "../../../entity/Articles";

interface IRequest {
    post_id: string;
    admin_id: string[];
}

@injectable()
class CreatePostAdmin {
    constructor(
        @inject("ArticleRepository")
        private articleRepo: IArticlesRepository,
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository
    ) {}

    async execute({post_id, admin_id}: IRequest): Promise<Articles> {
        const post = await this.articleRepo.findById(post_id)

        if(!post) {
            throw new Error("Post não encontrado.").message
        }

        const admin = await this.adminRepo.findByIds(admin_id)

        post.admins = admin

        await this.articleRepo.create(post)

        return post
    }
}


export { CreatePostAdmin }