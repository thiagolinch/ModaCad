import 'dotenv/config';
import MercadoPagoConfig, { Payment, PreApproval, PreApprovalPlan, Preference } from "mercadopago";
import { IMercadoPagoProvider } from "../IMercadoPagoProvider";
import { Plans } from '../../../../../Modules/Posts/entity/Plans'
import { Admins } from '../../../../../Modules/Admins/entity/Admins';
import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes';

export class MercadoPagoProvider implements IMercadoPagoProvider {

    async create(
        user: Admins,
        plan: Plans,
    ): Promise<PreferenceResponse> {
        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
        const preference = new Preference(client);

        const data = await preference.create({
        body: {
            items: [
            {
                title: plan.title,
                quantity: 1,
                unit_price: plan.price,
                id: plan.mp_id, // plan_id do mercado pago
                description: plan.description,
                currency_id: "BRL"
            }
            ],
            payer: {
                name: user.name,
                email: user.email
            },
            back_urls: {
                "success": "lobster-app-n6jep.ondigitalocean.app",
                "failure": "lobster-app-n6jep.ondigitalocean.app",
                "pending": "lobster-app-n6jep.ondigitalocean.app"
            },
            auto_return: "approved",
            notification_url: "https://api-modacad-72uqj.ondigitalocean.app/payment/feedback",
            external_reference: JSON.stringify({user_id: user.id, plan_id: plan.id}),
        }
        })
        console.log("payment id: ",data.id)
        return data
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
        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
        const payment = new Payment(client);

        const data = await payment.get({ id })

        return data;
    }

    async getPlanPayment(id: string): Promise<any> {
        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
        const preApproval = new PreApproval(client);

        const data = await preApproval.search({ options: {id} })

        return data
    }
}
