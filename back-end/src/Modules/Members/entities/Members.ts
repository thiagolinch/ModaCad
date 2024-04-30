import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";



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

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { Members }