import "reflect-metadata"; // Required for tsyringe
import { CreateAdmUseCase } from "./createAdmUseCase";
import { CreateAdmController } from "./createAdmController";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { IAdminRoleRepository } from "../../repositories/IAdminRole";
import { IMailProvider } from "../../../../Shared/container/providers/MailProvider/IMailProvider";
import { Request, Response } from "express";
import { container } from "tsyringe";

// Mocks
const adminRepositoryMock = {
    findByEmail: jest.fn(),
    createStaff: jest.fn(),
};

const roleRepositoryMock = {
    findByRole: jest.fn(),
};

const mailProviderMock = {
    sendMail: jest.fn(),
};

const mockedResponse = () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    return res as Response;
  };
  

describe("CreateAdmUseCase", () => {
    let createAdmUseCase: CreateAdmUseCase;

    beforeEach(() => {
        createAdmUseCase = new CreateAdmUseCase(
            adminRepositoryMock as unknown as IAdminsRepository,
            roleRepositoryMock as unknown as IAdminRoleRepository,
            mailProviderMock as unknown as IMailProvider
        );
    });

    it("should create a new admin and send an email", async () => {
        adminRepositoryMock.findByEmail.mockResolvedValue(null); // Admin does not exist
        adminRepositoryMock.createStaff.mockResolvedValue({ email: "test@example.com", role: "admin" });
        mailProviderMock.sendMail.mockResolvedValue(true);

        await createAdmUseCase.execute({
            email: "test@example.com",
            role: "admin",
        });

        expect(adminRepositoryMock.findByEmail).toHaveBeenCalledWith("test@example.com");
        expect(adminRepositoryMock.createStaff).toHaveBeenCalled();
        expect(mailProviderMock.sendMail).toHaveBeenCalled();
    });

    it("should throw an error if admin already exists", async () => {
        adminRepositoryMock.findByEmail.mockResolvedValue({ email: "existing@example.com" });

        await expect(
            createAdmUseCase.execute({
                email: "existing@example.com",
                role: "admin",
            })
        ).rejects.toThrow("This admin account already exists!");
    });
});

describe("CreateAdmController", () => {
    let createAdmController: CreateAdmController;

    beforeEach(() => {
        createAdmController = new CreateAdmController();
    });

    it("should return 201 if admin is created successfully", async () => {
        const req = {
            body: {
                email: "test@example.com",
                role: "admin",
            },
        } as Request;

        const res = mockedResponse();

        jest.spyOn(container, "resolve").mockReturnValue({
            execute: jest.fn().mockResolvedValue({
                email: "test@example.com",
                role: "admin",
            }),
        });

        await createAdmController.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            email: "test@example.com",
            role: "admin",
        });
    });

    it("should return 400 if there is an error", async () => {
        const req = {
            body: {
                email: "existing@example.com",
                role: "admin",
            },
        } as Request;

        const res = mockedResponse();

        jest.spyOn(container, "resolve").mockReturnValue({
            execute: jest.fn().mockRejectedValue(new Error("This admin account already exists!")),
        });

        await createAdmController.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "This admin account already exists!" }));
    });
});
