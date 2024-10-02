import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';
import { Articles } from "./Articles";

@Entity("posts_meta") // Mapeamento para a tabela 'posts_meta'
export class Meta {

    @PrimaryColumn()
    id?: string;

    @Column()
    post_id: string; // Relacionamento com 'post_id' da tabela articles

    @Column()
    og_image?: string;

    @Column()
    og_title?: string;

    @Column()
    og_description?: string;

    @Column()
    twitter_image?: string;

    @Column()
    twitter_title?: string;

    @Column()
    twitter_description?: string;

    @Column()
    meta_title?: string;

    @Column()
    meta_description?: string;

    @Column()
    email_subject?: string;

    @Column()
    frontmatter?: string;

    @Column()
    feature_image_alt?: string;

    @Column()
    feature_image_caption?: string;

    @Column()
    email_only?: string;

    // Relacionamento One-to-One com a entidade Articles
    @OneToOne(() => Articles, article => article.meta) 
    @JoinColumn({ name: "post_id" }) // Coluna 'post_id' referencia a tabela 'articles'
    article: Articles;

    constructor() {
        if (!this.id) {
            this.id = uuidV4(); // Geração automática de ID
        }
    }
}
