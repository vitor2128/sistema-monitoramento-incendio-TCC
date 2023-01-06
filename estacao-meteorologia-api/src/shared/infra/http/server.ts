import "reflect-metadata";
import "express-async-errors";
import "@shared/container";
import { env } from "@config/env";
import { app } from "@config/app";

app.listen(Number(env.port), "0.0.0.0", () => {
	console.log(`server running on port: ${env.port}`);
});
