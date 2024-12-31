import { DaysJSDateProvider } from "../../../../Shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "../../../../Shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AdminRepository } from "../../repositories/implements/AdminsRepository";
import { AdminTokenRepository } from "../../repositories/implements/AdminTokenRepository";
import { SendForgotPasswordUseCase } from "./sendForgotPasswordEmailUseCase";

let adminRepository: AdminRepository;
let adminRepositroyToken: AdminTokenRepository;
let dateJs: DaysJSDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordUseCase: SendForgotPasswordUseCase;

describe("Send forgot email test", () => {

    beforeEach(() => {
        adminRepository = new AdminRepository();
        adminRepositroyToken = new AdminTokenRepository();
        dateJs = new DaysJSDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordUseCase =new SendForgotPasswordUseCase(
            adminRepositroyToken,
            dateJs,
            adminRepository,
            mailProvider
        );
    });

    it("Should be able to send a forgot passsword email to user", async () => {
        const sendEmail  = jest.spyOn(mailProvider, "sendMail");

        await adminRepository.create({
            name: "tester",
            email: "user@test.com.br",
            password: "testuser",
            cellphone: "00000000000"
         });

        await sendForgotPasswordUseCase.execute("epnivor@ebho.pa")

        expect(sendEmail).toHaveBeenCalled();
    });

    it("Should not be able to send a email to a non existent user", async () => {
        await expect(sendForgotPasswordUseCase.execute("thiago@gmail.com")).rejects.toEqual("User does not exists")
    });

    it("Should be able to create a new user token to recovery the password", async () => {
        const generateToken = jest.spyOn(adminRepositroyToken, "create")

        await adminRepository.create({
            name: "tester",
            email: "user@test.com.br",
            password: "testuser",
            cellphone: "00000000000"
         });

        await sendForgotPasswordUseCase.execute("bojuw@dop.pr");

        expect(generateToken).toBeCalled()
    })
})