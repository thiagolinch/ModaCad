import { Router } from "express";

const tagRoutes = Router()

tagRoutes.get("/", (request, response) => {
    return console.log("Tag router")
})

tagRoutes.post("/", (request, return) => (
    return console.log("tag post route")
))

export  { tagRoutes }