import { Router } from "express";
import { temperatureHumidityRoutes } from "./temperatureHumidity.routes";

const router = Router();

router.use("/temperature-humidity", temperatureHumidityRoutes);

router.get("/status", (req, res) => {
  res.json({ status: "Ok" });
});

export { router };
