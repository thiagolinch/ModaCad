import 'dotenv/config';
import MercadoPagoConfig, { Preference } from "mercadopago";
import { IMercadoPagoProvider } from "../IMercadoPagoProvider";

interface IResponse {
    // id: string;
    payment_url: string;
    // outros campos relevantes
}
export class MercadoPagoProvider implements IMercadoPagoProvider {

    async create(
        transaction_amount: number,
        description: string,
		email: string,
        user_name: string,
        quantity?: number,
        title?: string,
        payment_method_id?: string,
        mp_plan_id?: string
    ): Promise<IResponse> {
        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN_TEST });
        const preference = new Preference(client);

        const data = await preference.create({
        body: {
            items: [
            {
                title: title,
                quantity: quantity,
                unit_price: transaction_amount,
                id: mp_plan_id, // plan_id do mercado pago
                description: description
            }
            ],
            payer: {
                email: email,
                name: user_name
            },
            back_urls: {
                "success": "lobster-app-n6jep.ondigitalocean.app",
                "failure": "lobster-app-n6jep.ondigitalocean.app",
                "pending": "lobster-app-n6jep.ondigitalocean.app"
            },
            auto_return: "approved",
            notification_url: "https://api-modacad-72uqj.ondigitalocean.app/payment/feedback"
        }
        })
        console.log("payment id: ",data.id)
        const payment_url = data.sandbox_init_point;
        return {payment_url}
    }

    createPlan(reason: string, frequency: number, frequency_type: string, transaction_amount: number, currency_id: string, repetitions: number, back_url: string, email: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    getPayment(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }    
}
