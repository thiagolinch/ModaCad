import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Plans1714419903573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "plans",
                    columns: [
                        {
                            name: "id",
                            type: "uuid"
                        },
                        {
                            name: "title",
                            type: "varchar"
                        },
                        {
                            name: "description",
                            type: "varchar"
                        },
                        {
                            name: "topics",
                            type: "array"
                        },
                        {
                            name: "price",
                            type: "varchar"
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("plans")
    }

}
