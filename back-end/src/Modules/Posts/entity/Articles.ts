import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
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
    description: string;

    @Column()
    author: string;

    @ManyToOne(() => Admins)
    @JoinColumn({name: "author"})
    author_id: Admins;

    tag_id: string;

    @ManyToOne(() => Subjects)
    @JoinColumn({name: "tag_id"})
    tags: Subjects;

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export { Articles }