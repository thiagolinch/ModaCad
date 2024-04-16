import "reflect-metadata"
import { DataSource } from "typeorm"
import { Tags } from "../../Modules/Tags/entities/Tags"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5430,
    username: "modacad_db",
    password: "moda_fashion_2024",
    database: "db_modacad",
    synchronize: true,
    logging: false,
    entities: [Tags],
    migrations: [],
    subscribers: []
})