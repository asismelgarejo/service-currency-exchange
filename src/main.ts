import express, { Express } from "express";
import cors from "cors";
import pkg from "body-parser";
const { urlencoded } = pkg;
import UsersModule from "./modules/users/users.module";
import ExchangeRequestsModule from "./modules/exchange-requests/exchange-requests.module";
import AuthModule from "./modules/auth/auth.module";
import * as dotenv from "dotenv";
import * as path from "path";
import { PORT } from "./constants/app";

import { fileURLToPath } from "url";
import { dirname } from "path";

import { InitializeDB } from "./database";
import { authenticateToken } from "./middlewares/authenticateToken";
import { Middlewares } from "./constants/interfaces";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class Application {
  app: Express;
  constructor() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(urlencoded({ extended: false }));

    const envPath = path.resolve(__dirname, "..", ".development.env");
    dotenv.config({ path: envPath });

    this.app = app;
  }

  async Init() {
    const dbClient = await InitializeDB();

    const middlewares: Middlewares = {};
    const { usersService } = await UsersModule.Init(dbClient, this.app);
    middlewares.authenticateToken = authenticateToken(usersService);

    AuthModule.Init(dbClient, this.app);
    ExchangeRequestsModule.Init(dbClient, this.app, middlewares);

    this.app.use("/hello", (_, res, _2) => {
      res.status(200).json({ message: "Project Created by Asis Melgarejo" });
    });

    this.app.use((_, res, _2) => {
      res.status(404).json({ error: "NOT FOUND" });
    });

    this.app.listen(PORT, function () {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}
