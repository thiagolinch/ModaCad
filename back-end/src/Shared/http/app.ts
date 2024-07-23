import 'reflect-metadata';
import cors from "cors"

import "../TypeOrm/data-source"

import createConnection from "../TypeOrm/data-source"
import "../container"

import express from "express";

import { routes } from './Routes';

createConnection();
const app = express();

const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));


app.use(express.json());

app.use(routes)

export { app }