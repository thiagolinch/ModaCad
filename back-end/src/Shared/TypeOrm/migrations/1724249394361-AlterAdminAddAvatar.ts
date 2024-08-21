import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterAdminAddAvatar1724249394361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("admins",
            new TableColumn(
                {
                    name: "avatar",
                    type: "varchar",
                    isNullable: true
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "avatar")
    }


}
