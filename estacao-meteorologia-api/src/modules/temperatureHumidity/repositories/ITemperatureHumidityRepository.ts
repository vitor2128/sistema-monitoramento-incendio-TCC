import { ICreateTemperatureHumidityDTO } from "../dtos/ICreateTemperatureHumidityDTO";
import { TemperatureHumidity } from "../infra/knex/entities/TemperatureHumidity";

export interface ITemperatureHumidityRepository {
	create(data: ICreateTemperatureHumidityDTO): Promise<void>;
	list(): Promise<TemperatureHumidity[]>;
}
