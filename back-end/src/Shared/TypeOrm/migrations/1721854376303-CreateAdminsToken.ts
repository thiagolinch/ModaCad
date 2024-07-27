import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAdminsToken1721854376303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "admins_tokens",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "refresh_token",
                        type: "varchar"
                    },
                    {
                        name: "admin_id",
                        type: "uuid"
                    },
                    {
                        name: "expires_date",
                        type: "timestamp"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_Admin_Token",
                        referencedTableName: "admins",
                        referencedColumnNames: ["id"],
                        columnNames: ["admin_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("admins_tokens")
    }

}
