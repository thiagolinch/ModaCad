import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";



@Entity("tags")//tags
class Tags {

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

export { Tags }