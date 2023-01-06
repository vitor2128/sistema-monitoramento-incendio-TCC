import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTemperatureHumidityUseCase } from "./ListTemperatureHumidityUseCase";

class ListTemperatureHumidityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTemperatureHumidityUseCase = container.resolve(
      ListTemperatureHumidityUseCase
    );

    const data = await listTemperatureHumidityUseCase.execute();

    return response.status(200).json(data);
  }
}

export { ListTemperatureHumidityController };
