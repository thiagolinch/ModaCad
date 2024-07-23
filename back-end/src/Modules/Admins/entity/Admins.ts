import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("admins")//admins
class Admins {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    cellphone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    adminPro: boolean;

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date

    constructor() {
        if(!this.id){
            this.id = uuidV4()
            this.adminPro = false
        }
    }
    
}


export { Admins }