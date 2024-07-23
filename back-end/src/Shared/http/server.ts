import 'reflect-metadata'

import "../container/index"

import { app } from "./app"

app.listen(8080, () => {console.log("server is running!")})