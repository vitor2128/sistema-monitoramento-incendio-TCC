export class AppError {
	public readonly message: string;
	public readonly type: string;
	public readonly statusCode: number;

	constructor(message: string, statusCode = 400, type = "error") {
		this.message = message;
		this.type = type;
		this.statusCode = statusCode;
	}
}
