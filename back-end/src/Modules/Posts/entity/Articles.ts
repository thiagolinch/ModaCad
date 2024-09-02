import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

import { Admins } from "../../Admins/entity/Admins";
import { Subjects } from "../../Assuntos/entities/Tags";


@Entity("articles")//articles
class Articles {
    @PrimaryColumn()
    id?: string;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column()
    type: string;

    @Column()
    html: string;

    @Column()
    comments_id: string;

    @Column()
    admin_id: string;

    @ManyToMany(() => Admins)
    @JoinColumn({name: "author"})
    author_id: Admins;

    @ManyToMany(() => Subjects)
    @JoinTable({
        name: "subjects",
        joinColumns: [{ name: "article_id" }],
        inverseJoinColumns: [{ name: "subjects_id" }]
    })
    subjects: Subjects[];

    @Column()
    plaintext: string;

    @Column()
    feature_image: string;

    @Column()
    status: string;

    @Column()
    visibility: string;

    @Column()
    show_title_and_feature_image: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export { Articles }