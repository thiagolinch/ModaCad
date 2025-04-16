import {MigrationInterface, QueryRunner} from "typeorm";

export class AddViewsToArticles1744246877187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE articles
            ADD COLUMN views INT DEFAULT 0;
        `);
        await queryRunner.query(`
            ALTER TABLE articles
            ADD COLUMN ga_path VARCHAR(255);
        `);
        await queryRunner.query(`
            CREATE INDEX idx_articles_ga_path ON articles(ga_path);
        `);
        await queryRunner.query(`
            CREATE INDEX idx_articles_views ON articles(views);
        `);
        await queryRunner.query(`
            CREATE INDEX idx_articles_views_ga_path ON articles(views, ga_path);
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX idx_articles_views_ga_path;
        `);
        await queryRunner.query(`
            DROP INDEX idx_articles_views;
        `);
        await queryRunner.query(`
            DROP INDEX idx_articles_ga_path;
        `);
        await queryRunner.query(`
            ALTER TABLE articles
            DROP COLUMN ga_path;
        `);
        await queryRunner.query(`
            ALTER TABLE articles
            DROP COLUMN views;
        `);
    }

}
