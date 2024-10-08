import { Request, Response } from "express";
import { CreatePostUseCase } from "./createpostUseCase";
import { container } from "tsyringe";
import { mock } from "jest-mock-extended";
import { CreatePostController } from "./createPostController";

describe("CreatePostController", () => {
    let createPostController: CreatePostController;
    let createPostUseCase: CreatePostUseCase;
    let mockRequest: Request;
    let mockResponse: Response;

    beforeEach(() => {
        // Create an instance of the controller and mock the use case
        createPostController = new CreatePostController();
        createPostUseCase = mock<CreatePostUseCase>();

        // Mock the dependency injection container to resolve the use case
        container.resolve = jest.fn().mockReturnValue(createPostUseCase);

        // Mock the Express request and response objects
        mockRequest = mock<Request>();
        mockResponse = mock<Response>();
        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn();
    });

    it("should successfully create a post and return a 200 status code", async () => {
        // Arrange: Mock request body and admin data
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
            // additional fields here...
        };
        mockRequest.admin = { id: "adminId1" };

        // Arrange: Mock the createPostUseCase to return a mock article
        const mockArticle = { id: "1", title: "Test Title" };
        createPostUseCase.execute = jest.fn().mockResolvedValue(mockArticle);

        // Act: Call the controller's handle method
        await createPostController.handle(mockRequest, mockResponse);

        // Assert: Check that the status and json methods were called correctly
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockArticle);
        expect(createPostUseCase.execute).toHaveBeenCalledWith({
            title: "Test Title",
            description: "Test Description",
            content: "Test Content",
            visibility: "public",
            status: "draft",
            type: "blog",
            tags: ["test", "jest"],
            subjects: ["testing"],
            admins: ["adminId1"],
            // additional fields here...
        });
    });

    it("should return a 400 status code when an error occurs", async () => {
        // Arrange: Mock the request and the use case to throw an error
        mockRequest.body = { title: "Invalid Data" };
        mockRequest.admin = { id: "adminId1" };
        createPostUseCase.execute = jest.fn().mockRejectedValue(new Error("Invalid input"));

        // Act: Call the controller's handle method
        await createPostController.handle(mockRequest, mockResponse);

        // Assert: Verify that a 400 status code and error message were returned
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: new Error("Invalid input") });
    });
});
