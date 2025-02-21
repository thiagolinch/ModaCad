import 'dotenv/config';
import MercadoPagoConfig, { Payment, PreApproval, PreApprovalPlan, Preference } from "mercadopago";
import { IMercadoPagoProvider } from "../IMercadoPagoProvider";
import { Plans } from '../../../../../Modules/Posts/entity/Plans'
import { Admins } from '../../../../../Modules/Admins/entity/Admins';
import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes';

export class MercadoPagoProvider implements IMercadoPagoProvider {
    
    async pay(user: Admins, plan: Plans): Promise<PreferenceResponse> {
        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
        const preference = new Preference(client);

        const body = {
            items: [
              {
                id: plan.mp_id,
                title: plan.title,
                description: plan.description,
                quantity: 1,
                currency_id: 'BRL',
                unit_price: plan.price,
              },
            ],
            payer: {
              name: user.name,
              email: user.email
            },
            back_urls: {
              success: 'https://blog.modacad.com.br',
              failure: 'https://blog.modacad.com.br',
              pending: 'https://blog.modacad.com.br',
            },
            external_reference: JSON.stringify({user_id: user.id, plan_id: plan.id}),
            auto_return: 'approved'
        };

        const data = await preference.create({ body });
        return data;
    }

    async payPlan(
        user: Admins,
        plan: Plans,
    ): Promise<PreferenceResponse> {
        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
        const preApproval = new PreApproval(client);

        const data = await preApproval.create({
            body: {
                payer_email: user.email,
                back_url: "https://lobster-app-n6jep.ondigitalocean.app",
                reason: plan.title,
                external_reference: JSON.stringify({user_id: user.id, plan_id: plan.id}),
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: plan.price,
                    currency_id: "BRL"
                }
            }
        });
        
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
