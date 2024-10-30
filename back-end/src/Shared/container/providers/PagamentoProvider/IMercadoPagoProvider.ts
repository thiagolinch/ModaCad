
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

}


interface IMercadoPagoProvider {
    create(
        transaction_amount: number,
        description: string,
        installments?: number,
        payment_method_id?: string,
        issuer_id?: number,
        token?: string,
		email?: string,
        doc_type?: string,
        doc_number?: string
    ): Promise<IResponse>;

    createPlan(
        reason: string,
        frequency: number,
        frequency_type: string,
        transaction_amount: number,
        currency_id: string,
        repetitions: number,
        back_url: string
    ): Promise<any>;

    getPayment(id: string): Promise<any>;
}

export { IMercadoPagoProvider }