import { Column, Entity, Index, PrimaryColumn, Unique } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Unique(["id"])
@Index(["id"], {unique: true})
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