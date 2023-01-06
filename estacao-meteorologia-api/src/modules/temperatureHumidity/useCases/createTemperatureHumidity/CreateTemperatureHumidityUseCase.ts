import twilio from "twilio";
import { inject, injectable } from "tsyringe";

import { ITemperatureHumidityRepository } from "@modules/temperatureHumidity/repositories/ITemperatureHumidityRepository";

interface IRequest {
  temperature: string;
  humidity: string;
  smoke: boolean;
}

@injectable()
class CreateTemperatureHumidityUseCase {
  constructor(
    @inject("TemperatureHumidityRepository")
    private temperatureHumidityRepository: ITemperatureHumidityRepository
  ) {}

  async execute({ humidity, temperature, smoke }: IRequest): Promise<void> {
    const accountSid: string = process.env.TWILIO_ACCOUNT_SID;
    const token: string = process.env.TWILIO_AUTH_TOKEN;

    const client = twilio(accountSid, token);

    const fromSms = process.env.FROM_NUMBER;
    const toSms = process.env.TO_NUMBER;

    const fromWhatsapp = process.env.FROM_NUMBER;
    const toWhatsapp = process.env.TO_NUMBER;

    const sendMessageSms = async (message: string) => {
      const msgData = {
        from: fromSms,
        to: toSms,
        body: `${message}. Temperatura: ${temperature}ºC, Umidade: ${humidity}%`,
      };

      await client.messages.create(msgData, (err, result) => {
        console.log("Created message with SMS");
        // console.log(result.sid);
      });
    };

    const sendMessageWhatsapp = async (message: string) => {
      const msgData = {
        from: fromWhatsapp,
        to: toWhatsapp,
        body: `${message}. Temperatura: ${temperature}ºC, Umidade: ${humidity}%`,
      };

      await client.messages.create(msgData, (err, result) => {
        console.log("Created message with WhatsApp");
        // console.log(result.sid);
      });
    };

    const temperatureInt = parseInt(temperature);
    const humidityInt = parseInt(humidity);

    if (temperatureInt >= 32 && humidityInt <= 30) {
      await sendMessageSms("Alerta: Alto risco de incêndio");

      await sendMessageWhatsapp("Alerta: alto risco de incêndio");
    }

    if (temperatureInt >= 38 && humidityInt <= 25) {
      await sendMessageSms("Alerta: Risco de Incêndio");

      await sendMessageWhatsapp("Alerta: Risco de incêndio eminente");
    }

    if (smoke) {
      await sendMessageSms("Alerta: Fumaça detectada");

      await sendMessageWhatsapp("Alerta: Fumaça detectada");
    }

    await this.temperatureHumidityRepository.create({
      humidity,
      temperature,
      smoke,
    });
  }
}

export { CreateTemperatureHumidityUseCase };
