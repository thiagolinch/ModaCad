import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

import { Admins } from "../../Admins/entity/Admins";
import { Subjects } from "../../Assuntos/entities/Subject";


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

    @Column()
    admin: string;

    @ManyToOne(() => Admins)
    @JoinColumn({ name: "admin" })
    admins: Admins;

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date

    @CreateDateColumn()
    published_at?: Date

    @Column("varchar", {array: true})
    tags?: string[];   

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