import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryColumn, Unique } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Articles } from "../../Posts/entity/Articles";

@Unique(["id"])
@Index(["id"], {unique: true})
@Entity("subjects")//subjects
class Subjects {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    sort: number;

    @ManyToMany(() => Articles, article => article.subjects)
    articles: Articles[];

    constructor() {
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { Subjects }