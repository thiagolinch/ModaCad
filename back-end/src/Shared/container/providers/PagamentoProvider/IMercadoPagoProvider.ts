
interface IRequest {
    id: string,
    transaction_amount: number,
    description: string,
    payment_method_id: string,
    token?: string,
	mail: string;
}

interface IResponse {

}


interface IMercadoPagoProvider {
    create({
        id,
        transaction_amount,
        description,
        payment_method_id,
        token,
		mail
    }: IRequest): Promise<IResponse>;

    createPlan(
        reason: string,
        frequency: number,
        frequency_type: string,
        transaction_amount: number,
        currency_id: string,
        repetitions: number,
        back_url: string
    ): Promise<any>;
}

export { IMercadoPagoProvider }