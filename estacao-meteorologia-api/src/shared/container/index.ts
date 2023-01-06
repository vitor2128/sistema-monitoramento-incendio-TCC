import { container } from "tsyringe";

import { TemperatureHumidityRepository } from "@modules/temperatureHumidity/infra/knex/repositories/TemperatureHumidityRepository";
import { ITemperatureHumidityRepository } from "@modules/temperatureHumidity/repositories/ITemperatureHumidityRepository";

container.registerSingleton<ITemperatureHumidityRepository>(
  "TemperatureHumidityRepository",
  TemperatureHumidityRepository
);
