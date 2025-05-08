import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { inject, injectable } from "tsyringe";
import ExcelJS from 'exceljs';
import { Buffer } from 'buffer';


@injectable()
export class ExportMembersUseCase {
    constructor(
        @inject("AdminRepository")
        private adminRepo: IAdminsRepository
    ) {}

    async execute(): Promise<Buffer> {
        const data = await this.adminRepo.allUsers();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Membros');

        worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nome', key: 'name', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Data de Cadastro', key: 'created_at', width: 20 },
        ];

        data.forEach(user => {
        worksheet.addRow({
            id: user.id,
            name: user.name,
            email: user.email,
            cellphone: user.cellphone,
            first_payment: user.payment_created_at,
            last_payment: user.payment_updated_at,
            role: user.role,
            plan: user.plan,
            subscription: user.subscription_created_at,
            
            created_at: user.created_at,
        });
        });

        // Retorna o buffer do arquivo .xlsx
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);   
    }
}