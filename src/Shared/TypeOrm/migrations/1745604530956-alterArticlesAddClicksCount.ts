import {MigrationInterface, QueryRunner} from "typeorm";

export class alterArticlesAddClicksCount1745604530956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE articles
            ADD COLUMN clicks_count INT DEFAULT 0;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE articles
            DROP COLUMN clicks_count;
        `);
    }

}
