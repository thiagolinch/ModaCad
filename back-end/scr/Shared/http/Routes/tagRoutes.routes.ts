import { Router } from "express";

const tagRoutes = Router()

tagRoutes.get("/", (request, response) => {
    return console.log("Tag router")
})

export  { tagRoutes }