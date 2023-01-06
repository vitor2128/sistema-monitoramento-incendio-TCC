import { CreateTemperatureHumidityController } from "@modules/temperatureHumidity/useCases/createTemperatureHumidity/CreateTemperatureHumidityController";
import { ListTemperatureHumidityController } from "@modules/temperatureHumidity/useCases/listTemperatureHumidity/ListTemperatureHumidityController";
import { Router } from "express";

const temperatureHumidityRoutes = Router();

const createTemperatureHumidityController = new CreateTemperatureHumidityController();
const listTemperatureHumidityController = new ListTemperatureHumidityController();

temperatureHumidityRoutes.get("/", listTemperatureHumidityController.handle);
temperatureHumidityRoutes.post("/create", createTemperatureHumidityController.handle);

export { temperatureHumidityRoutes };
