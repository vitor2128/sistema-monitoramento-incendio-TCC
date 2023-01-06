import { inject, injectable } from "tsyringe";

import { ITemperatureHumidityRepository } from "@modules/temperatureHumidity/repositories/ITemperatureHumidityRepository";
import { TemperatureHumidity } from "@modules/temperatureHumidity/infra/knex/entities/TemperatureHumidity";

@injectable()
class ListTemperatureHumidityUseCase {
  constructor(
    @inject("TemperatureHumidityRepository")
    private temperatureHumidityRepository: ITemperatureHumidityRepository
  ) {}

  async execute(): Promise<TemperatureHumidity[]> {
    return await this.temperatureHumidityRepository.list();
  }
}

export { ListTemperatureHumidityUseCase };
