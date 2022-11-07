import express from "express";
import { api } from "../config.js"
import { router } from "./components/user/network.js"
import cors from "cors"
import parse from "body-parser";
import { authenticacion } from "./components/auth/network.js";

const { json } = parse
const app = express()
app.use(cors())
app.use(json())
app.use("/api/user" , router)
app.use("/api/auth" , authenticacion)

app.listen(api.port, () => {
    console.log(`Api escuchando desde el puerto ${api.port}`);
})