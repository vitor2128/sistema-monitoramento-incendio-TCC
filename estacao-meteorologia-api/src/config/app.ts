import express from "express";
import { router } from "@shared/infra/http/routes";
import { setupMiddlewares } from "./setupMiddlewares";
import { setupExpressErrors } from "./setupExpressErrors";

const app = express();
setupMiddlewares(app);
app.use("/api/v1", router);
setupExpressErrors(app);
export { app };
