import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CREATEADMINPOST1726094357096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "post_admin",
                columns: [
                    {
                        name: "admin_id",
                        type: "uuid"
                    },
                    {
                        name: "post_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "post_admin",
            new TableForeignKey({
                name: "FKPOSTADMIN",
                referencedTableName: "articles",
                referencedColumnNames: ["id"],
                columnNames: ["post_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        );

        await queryRunner.createForeignKey(
            "post_admin",
            new TableForeignKey({
                name: "FKADMINCAR",
                referencedTableName: "admins",
                referencedColumnNames: ["id"],
                columnNames: ["admin_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("post_admin", "FKPOSTADMIN")
        await queryRunner.dropForeignKey("post_admin", "FKADMINCAR")

        await queryRunner.dropTable("post_admin")
    }

}