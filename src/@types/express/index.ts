import * as express from "express";
import { Articles } from "../../Modules/Posts/entity/Articles";
declare global {
    namespace Express {
        export interface Request {
            user: Record<string,any>,
            admin: Record<string,any>,
            post: boolean;
            postStatus?: string,
            article: Articles
        }
    }
}