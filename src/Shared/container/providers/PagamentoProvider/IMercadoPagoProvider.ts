
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

interface IResponse {
    payment_url: string
}


interface IMercadoPagoProvider {
    create(
        transaction_amount: number,
        description: string,
		email: string,
        user_name: string,
        quantity?: number,
        title?: string,
        payment_method_id?: string,
        mp_plan_id?: string
    ): Promise<IResponse>;

    createPlan(
        reason: string,
        frequency: number,
        frequency_type: string,
        transaction_amount: number,
        currency_id: string,
        repetitions: number,
        back_url: string,
        email: string
    ): Promise<any>;

    getPayment(id: string): Promise<any>;
}

export { IMercadoPagoProvider }