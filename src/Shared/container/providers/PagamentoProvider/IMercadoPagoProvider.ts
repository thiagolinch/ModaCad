import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { Admins } from "../../../../Modules/Admins/entity/Admins";
import { Plans } from "../../../../Modules/Posts/entity/Plans";
interface IMercadoPagoProvider {
    create(
        user: Admins,
        plan: Plans,
    ): Promise<PreferenceResponse>;

    createPlan(
        title: string,
        frequency: number,
        frequency_type: string,
        transaction_amount: number,
        currency_id: string,
        repetitions: number,
        back_url: string
    ): Promise<any>;

    getPayment(id: string): Promise<any>;
    getPlanPayment(id: string): Promise<any>;
}

export { IMercadoPagoProvider }