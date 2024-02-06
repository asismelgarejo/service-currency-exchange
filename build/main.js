import express from "express";
import cors from "cors";
import pkg from "body-parser";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import UsersModule from "./modules/users/users.module.js";
import ExchangeRequestsModule from "./modules/exchange-requests/exchange-requests.module.js";
import AuthModule from "./modules/auth/auth.module.js";
import { PORT } from "./constants/app.js";
import { InitializeDB } from "./database/index.js";
import { authenticateToken } from "./middlewares/authenticateToken.js";
const { urlencoded } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));
export default class Application {
    app;
    constructor() {
        const app = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cors());
        app.use(urlencoded({ extended: false }));
        const envPath = path.resolve(__dirname, "..", process.env.NODE_ENV === "prod" ? ".production.env" : ".development.env");
        dotenv.config({ path: envPath });
        this.app = app;
    }
    async Init() {
        const dbClient = await InitializeDB();
        const middlewares = {};
        const { usersService } = await UsersModule.Init(dbClient, this.app);
        middlewares.authenticateToken = authenticateToken(usersService);
        AuthModule.Init(dbClient, this.app);
        ExchangeRequestsModule.Init(dbClient, this.app, middlewares);
        this.app.use("/hello", (_, res, _2) => {
            res.status(200).json({ message: "Project Created by Asis Melgarejo" });
        });
        this.app.use((_, res, _2) => {
            res.status(404).json({ error: "ROUTE NOT FOUND" });
        });
        this.app.listen(PORT, function () {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
}
