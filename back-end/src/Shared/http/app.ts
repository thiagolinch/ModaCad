import 'reflect-metadata';
import cors from "cors"
import express from "express";

import "../TypeOrm/data-source"
import createConnection from "../TypeOrm/data-source"
import "../container"
import { routes } from './Routes';

createConnection();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use(routes)

export { app }