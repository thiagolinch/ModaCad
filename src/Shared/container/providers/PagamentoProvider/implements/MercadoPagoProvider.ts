import 'dotenv/config';
import MercadoPagoConfig, { Payment, PreApproval, PreApprovalPlan, Preference } from "mercadopago";
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
        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
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

    async createPlan(
        title: string,
        frequency: number,
        frequency_type: string,
        transaction_amount: number,
        currency_id: string,
        repetitions: number,
        back_url: string
    ): Promise<any> {
        try {
            const preApprovalPlan = new PreApprovalPlan({ accessToken: process.env.MP_ACCESS_TOKEN });
            const body = {
                reason: title,
                auto_recurring: {
                    frequency,
                    frequency_type,
                    transaction_amount,
                    currency_id,
                    repetitions,
                },
                back_url
            };             
              

            const data = await preApprovalPlan.create({ body });

            console.log(data)
            return data
        } catch (error) {
            console.error("Error creating plan:", error);
            throw new Error(`Error creating plan: ${error.message}`);
        }
    }

    async getPayment(id: string): Promise<any> {
        console.log("provider")
        const client = new MercadoPagoConfig({ accessToken: "APP_USR-1863938077755588-011614-cf7d8b013569e82c642e1beb6f658e1c-231121661" });
        const payment = new Payment(client);

        const data = await payment.get({ id })
        console.log("data", data)

        return data
    }    
}
