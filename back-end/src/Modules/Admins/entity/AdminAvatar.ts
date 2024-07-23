import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid";

import { Admins } from "./Admins";


@Entity("admin_avatar") //admin_avatar
class AdminAvatar {

    @PrimaryColumn()
    id: string;

    @Column()
    admin_avatar_name: string;

    @Column()
    admin_id: string;

    @ManyToOne(() => Admins)
    @JoinColumn({name: "admin_id"})
    car: Admins

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}

export { AdminAvatar }