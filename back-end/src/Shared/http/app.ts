import 'reflect-metadata';

import "../TypeOrm/data-source"

import createConnection from "../TypeOrm/data-source"
import "../container"

import express from "express";

import { routes } from './Routes';

createConnection();
const app = express();

app.use(express.json());

app.use(routes)

export { app }