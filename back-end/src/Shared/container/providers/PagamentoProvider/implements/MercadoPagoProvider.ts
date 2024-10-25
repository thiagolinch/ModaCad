import MercadoPagoConfig, { Payment, PreApprovalPlan } from "mercadopago";
import { IMercadoPagoProvider } from "../IMercadoPagoProvider";

interface IRequest {
    id: string,
    transaction_amount: number,
    description: string,
    payment_method_id: string,
    token?: string;
    mail: string;
};

interface IResponse {

}

export class MercadoPagoProvider implements IMercadoPagoProvider {
    private mercadoPg = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN_TEST,
        options: { timeout: 5000 }
    });

    async create({
        transaction_amount,
        description,
        payment_method_id,
        token,
        mail
    }: IRequest): Promise<IResponse> {

        const body = {
            transaction_amount,
            description,
            payment_method_id,
            token,
            payer: {
                email: mail
            },
        }
        const client = new Payment(this.mercadoPg)
        const pay = await client.create({body})

        return pay
    }

    async createPlan(reason: string,
        frequency: number,
        frequency_type: string,
        transaction_amount: number,
        currency_id: string,
        repetitions: number,
        back_url: string
    ): Promise<any> {
        const preApprovalPlan = new PreApprovalPlan(this.mercadoPg)
        const body = {
            reason,
            auto_recurring: {
                frequency,
                frequency_type,
                transaction_amount,
                currency_id,
                repetitions
            },
            back_url
        };

        const data = await preApprovalPlan.create({body})

        return data;
    }

}