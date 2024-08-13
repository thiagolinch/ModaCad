import 'reflect-metadata'

import "../container/index"

import { app } from "./app"

app.listen(5002, () => {console.log("server is running!")})