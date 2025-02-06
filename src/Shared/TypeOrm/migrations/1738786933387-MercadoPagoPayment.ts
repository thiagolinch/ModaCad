import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class MercadoPagoPayment1738786933387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "mercado_pago_payments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "status",
                        type: "varchar"
                    },
                    {
                        name: "preapproval_plan_id",
                        type: "varchar"
                    },
                    {
                        name: "payment_method",
                        type: "varchar"
                    },
                    {
                        name: "payer_id",
                        type: "varchar"
                    },
                    {
                        name: "collector_id",
                        type: "varchar"
                    },
                    {
                        name: "payment_type",
                        type: "varchar"
                    },
                    {
                        name: "operation_type",
                        type: "varchar"
                    },
                    {
                        name: "payment_id",
                        type: "varchar"
                    },
                    {
                        name: "payer_email",
                        type: "varchar"
                    },
                    {
                        name: "subscription_id",
                        type: "varchar"
                    },
                    {
                        name: "date_created",
                        type: "timestamp"
                    },
                    {
                        name: "last_modified",
                        type: "timestamp"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
