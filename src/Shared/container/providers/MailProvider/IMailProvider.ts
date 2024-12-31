

interface IMailProvider {
    sendMail(to: string, subject: string, variables: any, path: string): Promise<any>;
}

export { IMailProvider }