import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

import { Admins } from "../../Admins/entity/Admins";
import { Subjects } from "../../Assuntos/entities/Subject";
import { ArticleImage } from "./ArticleImage";


@Entity("articles")//articles
class Articles {
    @PrimaryColumn()
    id?: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column()
    content: string;

    @ManyToMany(() => Admins)
    @JoinTable({
        name: "post_admins",
        joinColumn: {
            name: "admins",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "posts",
            referencedColumnName: "id"
        }
    })
    admins: Admins;

    @Column("varchar", {array: true})
    tags: string[];
    
    @Column("uuid", {array: true})
    subjects: string[];

    @ManyToMany(() => Subjects)
    @JoinColumn({name: "subjects"})
    subject: Subjects;

    @Column()
    status: string;

    @Column('simple-array', { nullable: true, array: true })
    images!: string[];

    @Column()
    visibility: string;

    @Column("array")
    imagesUrl: string[];


    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date

    @CreateDateColumn()
    published_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export { Articles }