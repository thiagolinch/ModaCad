import "reflect-metadata";import { Request, Response } from "express";
import { CreatePostUseCase } from "./createpostUseCase";
import { container } from "tsyringe";
import { CreatePostController } from "./createPostController";
import { mock } from "jest-mock-extended";

describe("CreatePostController", () => {
    let createPostController: CreatePostController;
    let createPostUseCase: jest.Mocked<CreatePostUseCase>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        // Initialize controller and mock dependencies
        createPostController = new CreatePostController();
        createPostUseCase = mock<CreatePostUseCase>();

        jest.spyOn(container, "resolve").mockReturnValue(createPostUseCase);

        mockRequest = {
            body: {},
            admin: { id: "adminId1" }, // Custom property for admin
        } as Partial<Request>;

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as Partial<Response>;
    });

    it("should successfully create a post and return a 200 status code", async () => {
        mockRequest.body = {
            title: "Test Title",
            description: "Test Description",
            content: "Test Content",
            visibility: "public",
            status: "draft",
            type: "blog",
            tags: ["test", "jest"],
            subjects: ["testing"],
            admins: ["adminId1"],
        };

        const mockArticleId = "1"; // Assuming the function returns only the ID
        createPostUseCase.execute.mockResolvedValue(mockArticleId);
        

        await createPostController.handle(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockArticleId);
        expect(createPostUseCase.execute).toHaveBeenCalledWith(expect.objectContaining(mockRequest.body));
    });

    it("should return a 400 status code when an error occurs", async () => {
        mockRequest.body = { title: "Invalid Data" };
        createPostUseCase.execute.mockRejectedValue(new Error("Invalid input"));

        await createPostController.handle(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
          error: expect.objectContaining({ message: "Invalid input" })
        });
    });
});
