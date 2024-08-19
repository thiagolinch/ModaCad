import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Plans } from "../../Posts/entity/Plans";



@Entity("members")//members
class Members {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    member_ship: string;

    @ManyToOne(() => Plans)
    @JoinColumn({name: "member_ship"})
    plan: Plans

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date

    constructor() {
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { Members }