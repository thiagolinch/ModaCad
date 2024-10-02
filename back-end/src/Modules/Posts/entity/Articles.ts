import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
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

    @Column('simple-array', { nullable: true, array: true })
    images?: string[];

    @Column()
    visibility?: string;

    @ManyToMany(() => Admins, admin => admin.posts)
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

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date

    @CreateDateColumn()
    published_at?: Date

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

    // Coluna que referencia a tabela de meta
    @Column()
    meta_id?: string;

    // Relação One-to-One com a entidade Meta
    @OneToOne(() => Meta, meta => meta.article)
    @JoinColumn({ name: "meta_id" }) // A coluna 'meta_id' relaciona articles e meta
    meta: Meta;

    // Gera ids automaticamente
    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.post_id = uuidV4();
        }
    }
}

export { Articles }
