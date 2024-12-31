import 'dotenv/config';
import MercadoPagoConfig, { CardToken, Payment, PreApproval, PreApprovalPlan } from "mercadopago";
import { IMercadoPagoProvider } from "../IMercadoPagoProvider";

interface IResponse {
    id: string;
    status: string;
    // outros campos relevantes
}

interface IRequest {
    id?: string;
    reason?: string;
    frequency?: number;
    frequency_type?: string;
    transaction_amount: number;
    payment_method_id: string;
    currency_id: string;
    token?: string;
    repetitions?: number;
    back_url: string;
    mail: string;
    free_trial?: {
        frequency: number;
        frequency_type: string;
    };
}

export class MercadoPagoProvider implements IMercadoPagoProvider {
    private mercadoPg = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN_TEST });

    async create(
        transaction_amount: number,
        description: string,
        email: string,
        payment_method_id?: string,
        token?: string,
    ): Promise<any> {
        try {
            if (!this.mercadoPg.accessToken) {
                throw new Error("Access token not set");
            }

            const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN_TEST });
            const payment = new Payment(client);

            const pay = await payment.create({
                body: { 
                    transaction_amount,
                    description,
                    payment_method_id,
                    payer: {
                        email,
                    }
                },
            
            });
            

            return pay;

        } catch (error) {
            console.error("Error creating payment:", error);
            throw new Error(`Error creating payment: ${error.message}`);
        }
    }

    /* async createPlan(
        reason: string,
        frequency: number,
        frequency_type: string,
        transaction_amount: number,
        currency_id: string,
        repetitions: number,
        back_url: string,
        email: string
    ): Promise<any> {
        try {
            const preApprovalPlan = new PreApprovalPlan(this.mercadoPg);
            const body = {
                reason,
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
    } */

    async createPlan(
        reason: string,
        frequency: number,
        frequency_type: string,
        transaction_amount: number,
        currency_id: string,
        repetitions: number,
        back_url: string,
        email: string
    ): Promise<any> {
        try {
            const preApprovalPlan = new PreApproval(this.mercadoPg);
            const body = {
                preapproval_plan_id: '2c9380849342d22c01935092a4390547',
                payer_email: 'thglinchin18@gmail.com',
                back_url: "https://api-modacad-72uqj.ondigitalocean.app/payment/notification"
            };             
              

            const data = await preApprovalPlan.create({ body });
            console.log(data.init_point)
            
            return data;
        } catch (error) {
            console.error("Error creating plan:", error);
            throw new Error(`Error creating plan: ${error.message}`);
        }
    }

    async getPayment(id: string): Promise<any> {
        try {
            const client = new Payment(this.mercadoPg);
            const payment = await client.get({ id });

            return payment
        } catch (error) {
            console.error("Error fetching payment:", error);
            throw new Error(`Error fetching payment: ${error.message}`);
        }
    }
}
