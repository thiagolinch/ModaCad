import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

import { Admins } from "../../Admins/entity/Admins";
import { Subjects } from "../../Assuntos/entities/Subject";
import { Tags } from "./Tags";
import { Meta } from "./Meta";


@Entity("articles") // Mapeamento para a tabela 'articles'
class Articles {
    @PrimaryColumn()
    id?: string;

    @Column({
        type: 'varchar',
        transformer: {
            from: (value: string) => value,
            to: (value: string) => value
        }
    })
    post_id: string;

    @Column()
    title?: string;

    @Column()
    description?: string;

    @Column()
    feature_image?: string;

    @Column()
    type?: string;

    @Column()
    content?: string;

    @Column()
    status: string;

    @Column()
    visibility?: string;

    @Column()
    slug: string;

    @Column()
    plaintext: string;

    @Column()
    mobiledoc: string;

    @Column()
    featured: string;

    @Column()
    canonicalUrl: string;

    @ManyToMany(() => Admins, admin => admin.postsAsAdmin)
    @JoinTable({
        name: "post_admin", // Tabela de junção entre articles e admins
        joinColumn: {
            name: "post_id", // Coluna que referencia articles
            referencedColumnName: "post_id",
        },
        inverseJoinColumn: {
            name: "admin_id", // Coluna que referencia admins
            referencedColumnName: "id",
        }
    })
    admins: Admins[];
    
    @ManyToMany(() => Admins, admin => admin.postsAsEditor)
    @JoinTable({
        name: "post_editor", // Tabela de junção entre articles e admins
        joinColumn: {
            name: "post_id", // Coluna que referencia articles
            referencedColumnName: "post_id",
        },
        inverseJoinColumn: {
            name: "admin_id", // Coluna que referencia admins
            referencedColumnName: "id",
        }
    })
    editors: Admins[];
    
    @ManyToMany(() => Admins, admin => admin.postsAsCurador)
    @JoinTable({
        name: "post_curador", // Tabela de junção entre articles e admins
        joinColumn: {
            name: "post_id", // Coluna que referencia articles
            referencedColumnName: "post_id",
        },
        inverseJoinColumn: {
            name: "admin_id", // Coluna que referencia admins
            referencedColumnName: "id",
        }
    })
    curadors: Admins[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: "timestamp" })
    published_at: Date | null;

    @ManyToMany(() => Tags, tag => tag.articles)
    @JoinTable({
        name: "posts_tags", // Tabela de junção entre articles e tags
        joinColumn: {
            name: "post_id", // Coluna que referencia articles
            referencedColumnName: "post_id"
        },
        inverseJoinColumn: {
            name: "tag_id", // Coluna que referencia tags
            referencedColumnName: "id"
        }
    })
    tags: Tags[];

    @ManyToMany(() => Subjects)
    @JoinTable({
        name: "posts_subjects",
        joinColumn: {
            name: "post_id",
            referencedColumnName: "post_id"
        },
        inverseJoinColumn: {
            name: "subject_id",
            referencedColumnName: "id"
        }
    })
    subjects: Subjects[];

    @ManyToMany(() => Meta, meta => meta.article)
    @JoinTable({
        name: "posts_meta",
        joinColumn: {
            name: "post_id",
            referencedColumnName: "post_id"
        },
        inverseJoinColumn: {
            name: "id",
            referencedColumnName: "id"
        }
    })
    meta: Meta;

    @Column({ name: 'viewCount', default: 0 })
    viewCount: number;

    @Column({ name: 'ga_path', nullable: true })
    gaPath: string;

    @Column({ name: 'clicks_count', default: 0 })
    clicks_count: number;

    // Gera ids automaticamente
    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.post_id = uuidV4();
        }
    }
}

export { Articles };
