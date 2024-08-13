import {MigrationInterface, QueryBuilder, QueryRunner, Table} from "typeorm";

export class CreateUsersToken1654735996540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_tokens",
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
                        name: "member_id",
                        type: "varchar"
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
                        name: "FK_Member_Token",
                        referencedTableName: "members",
                        referencedColumnNames: ["id"],
                        columnNames: ["member_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_tokens")
    }

}