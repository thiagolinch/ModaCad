import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToMany, 
    PrimaryColumn, 
    UpdateDateColumn 
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Articles } from "./Articles";

@Entity("tags")
export class Tags {
    @PrimaryColumn()
    id?: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    slug: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    feature_image: string;

    @Column({ nullable: true })
    parent_id?: string;

    @Column({ nullable: true })
    visibility: string;

    @Column({ nullable: true })
    og_image?: string;

    @Column({ nullable: true })
    og_title?: string;

    @Column({ nullable: true })
    og_description?: string;

    @Column({ nullable: true })
    twitter_image?: string;

    @Column({ nullable: true })
    twitter_title?: string;

    @Column({ nullable: true })
    twitter_description?: string;

    @Column({ nullable: true })
    meta_title?: string;

    @Column({ nullable: true })
    meta_description?: string;

    @Column({ nullable: true })
    code_injection_head?: string;

    @Column({ nullable: true })
    code_injection_foot?: string;

    @Column({ nullable: true })
    cannonical_url?: string;

    @Column({ nullable: true })
    accent_color?: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn() // Alterado para UpdateDateColumn
    updated_at: Date;

    @ManyToMany(() => Articles, article => article.tags) // Manter a relação ManyToMany
    articles: Articles[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
