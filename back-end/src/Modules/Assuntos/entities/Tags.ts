import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";



@Entity("subjects")//subjects
class Subjects {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    constructor() {
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { Subjects }