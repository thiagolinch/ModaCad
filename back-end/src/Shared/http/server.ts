import 'reflect-metadata'

import "../container/index"

import { app } from "./app"

app.listen(3333, () => {console.log("server is running!")})