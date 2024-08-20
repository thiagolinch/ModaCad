import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid";
import { Articles } from "./Articles";

@Entity("posts_images_banner")//posts_images_banner
class ArticleImage {

    @PrimaryColumn()
    id: string;

    @Column()
    image_name: string;

    @Column()
    article_id: string;

    @ManyToOne(() => Articles)
    @JoinColumn({name: "article_id"})
    article: Articles

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}

export { ArticleImage }