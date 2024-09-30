import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

import { Admins } from "../../Admins/entity/Admins";
import { Subjects } from "../../Assuntos/entities/Subject";
import { Tags } from "./Tags";


@Entity("articles")//articles
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
        name: "post_admin", // Nome da tabela de junção
        joinColumn: {
            name: "post_id", // Nome da coluna na tabela de junção que referencia articles
            referencedColumnName: "post_id",
        },
        inverseJoinColumn: {
            name: "admin_id", // Nome da coluna na tabela de junção que referencia admins
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
        name: "posts_tags", // Nome da tabela de junção
        joinColumn: {
            name: "post_id", // Nome da coluna de artigo na tabela de junção
            referencedColumnName: "post_id"
        },
        inverseJoinColumn: {
            name: "tag_id", // Nome da coluna de tag na tabela de junção
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

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
            this.post_id = uuidV4()
        }
    }
}

export { Articles }