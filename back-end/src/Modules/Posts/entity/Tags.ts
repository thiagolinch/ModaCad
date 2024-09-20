import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"



@Entity()
export class Tags {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    description: string;

    @Column()
    feature_image: string;

    @Column()
    parent_id?: any;

    @Column()
    visibility: string;

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
    code_injection_head?: any;

    @Column()
    code_injection_foot?: any;

    @Column()
    cannonical_url?: string;

    @Column()
    accesnt_color?: any;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}