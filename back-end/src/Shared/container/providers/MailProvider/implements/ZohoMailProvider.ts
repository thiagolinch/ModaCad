import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer"
import handlebars from "handlebars"
import fs from "fs";
import { IMailProvider } from "../IMailProvider";


@injectable()
class ZohoMailProvaider implements IMailProvider {
    private client: Transporter;

    constructor(){
            const transporter = nodemailer.createTransport({
                host: 'smtp.zoho.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'programmer@modacad.com.br',
                    pass: 'Meta10K*10MI'
                }
            });
            this.client = transporter;
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: "ModaCad <programmer@modacad.com.br",
            subject: subject,
            html: templateHTML

        });
    }

}

export { ZohoMailProvaider }