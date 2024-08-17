import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateArticlesImages1717010866385 implements MigrationInterface {

        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "posts_images_banner",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "post_id",
                            type: "varchar"
                        },
                        {
                            name: "image_name",
                            type: "varchar",
                            isUnique: true
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        }
                    ],
                    foreignKeys: [
                        {
                            name: "FKImagesPost",
                            referencedTableName: "articles",
                            referencedColumnNames: ["id"],
                            columnNames: ["post_id"],
                            onUpdate: "CASCADE",
                            onDelete: "CASCADE"
                        }
                    ]
                })
            )
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("posts_images_banner")
    }

}
