import { database } from "@shared/infra/database";
import { AppError } from "@shared/errors/AppError";
import { ICreateTemperatureHumidityDTO } from "@modules/temperatureHumidity/dtos/ICreateTemperatureHumidityDTO";
import { ITemperatureHumidityRepository } from "@modules/temperatureHumidity/repositories/ITemperatureHumidityRepository";
import { TemperatureHumidity } from "../entities/TemperatureHumidity";

export class TemperatureHumidityRepository
  implements ITemperatureHumidityRepository
{
  async list(): Promise<TemperatureHumidity[]> {
    try {
      return await database("temperatureHumidity").orderBy("created_at", 'desc');
    } catch (error) {
      throw new AppError("Error creating user", 500);
    }
  }

  async create(data: ICreateTemperatureHumidityDTO): Promise<void> {
    try {
      await database("temperatureHumidity").insert(data);
    } catch (error) {
      throw new AppError("Error creating user", 500);
    }
  }
}
