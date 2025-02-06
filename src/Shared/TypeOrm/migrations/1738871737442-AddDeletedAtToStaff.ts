import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDeletedAtToStaff1738871737442 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE admins
            ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE admins
            DROP COLUMN deleted_at;
        `);

    }

}
