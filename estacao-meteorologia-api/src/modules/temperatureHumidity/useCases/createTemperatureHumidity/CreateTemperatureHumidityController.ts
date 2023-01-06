import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTemperatureHumidityUseCase } from "./CreateTemperatureHumidityUseCase";

class CreateTemperatureHumidityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { temperature, humidity, smoke } = request.body;

    const createTemperatureHumidityUseCase = container.resolve(
      CreateTemperatureHumidityUseCase
    );

    await createTemperatureHumidityUseCase.execute({
      temperature,
      humidity,
      smoke: smoke === "1",
    });

    return response.status(201).send();
  }
}

export { CreateTemperatureHumidityController };
