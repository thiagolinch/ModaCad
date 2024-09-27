import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

import { Admins } from "../../Admins/entity/Admins";
import { Subjects } from "../../Assuntos/entities/Subject";
import { Tags } from "./Tags";


@Entity("articles")//articles
class Articles {
    @PrimaryColumn()
    id?: string;

    @Column()
    post_id?: string;

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

    @ManyToMany(() => Admins)
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

    @Column("uuid", {array: true})
    subject_id?: string[];

    @ManyToMany(() => Subjects)
    @JoinColumn({name: "subjects"})
    subject: Subjects;

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
            this.post_id = uuidV4()
        }
    }
}

export { Articles }