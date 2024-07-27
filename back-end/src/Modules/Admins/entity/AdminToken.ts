import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"

import { Admins } from "./Admins";


@Entity("admins_tokens")
class AdminTokens {

    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string;

    @Column()
    admin_id: string;

    @ManyToOne(() => Admins)
    @JoinColumn({name: "admin_id"})
    admin: Admins;

    @CreateDateColumn()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}

export { AdminTokens }