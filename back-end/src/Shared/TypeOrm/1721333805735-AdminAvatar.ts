import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AdminAvatar1721333805735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "admin_avatar",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "admin_id",
                        type: "uuid"
                    },
                    {
                        name: "admin_avatar_name",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("admin_avatar")
    }

}
