import { Express, NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

export const setupExpressErrors = (app: Express): void => {
	app.use(
		(err: Error, request: Request, response: Response, next: NextFunction) => {
			if (err instanceof AppError) {
				return response.status(err.statusCode).json({
					type: err.type,
					statusCode: err.statusCode,
					message: err.message,
				});
			}
			return response.status(500).json({
				status: "error",
				statusCode: 500,
				message: `Internal server error - ${err.message}`,
			});
		}
	);
};
