import { v4 as uuidV4 } from "uuid"
import { Column, CreateDateColumn, JoinColumn, ManyToMany, PrimaryColumn } from "typeorm";
import { Members } from "./Members";
import { Plans } from "../../Posts/entity/Plans";


class UserPayment {

    @PrimaryColumn()
    id?: string;

    @PrimaryColumn()
    transiction_id: string;

    @Column()
    member_id: string;

    @ManyToMany(() => Members)
    @JoinColumn({name: "member_id"})
    member: Members;

    @Column()
    plan_id: string;

    @ManyToMany(() => Plans)
    @JoinColumn({name: "plan_id"})
    plan: Plans

    @CreateDateColumn()
    created_at: Date;
    
    @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }

}