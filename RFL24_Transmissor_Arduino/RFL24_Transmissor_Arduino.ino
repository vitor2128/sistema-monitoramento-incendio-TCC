#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
#include <DHT.h>
 
#define DHTPIN 7
#define DHTTYPE DHT22

RF24 radio(8 ,9); // CE, CSN
DHT dht(DHTPIN, DHTTYPE);

int valor, LedF;

unsigned long tempoAnterior = 0; // Armazena o último momento em que foi atualizado
const long PERIODO = 300000;

const byte address[6] = "00001";

bool Fumaca = false;
 
struct MyData 
{
  float Temperature;
  float Humidity;
  bool Fumaca;
};

MyData data;
 
void setup() 
{
  Serial.begin(115200);
  
  radio.begin();

  radio.setChannel(127);
  radio.setDataRate(RF24_2MBPS);
  radio.setPALevel(RF24_PA_HIGH);
  //radio.powerUp();
  radio.openWritingPipe(address);
  radio.stopListening();

  dht.begin();
 
}

void envioTemperaturaUmidade() 
{   
    data.Temperature = dht.readTemperature();
    data.Humidity = dht.readHumidity();
    data.Fumaca = Fumaca;
  
    Serial.print("Temperature = ");
    Serial.print(data.Temperature);
    Serial.println("ºC");
 
    Serial.print("Humidity = ");
    Serial.print(data.Humidity);
    Serial.println("%");
 
    Serial.println();
  
    radio.write(&data, sizeof(MyData));

    Serial.println("Data Packet Sent");

    Serial.println();
}

void sensorFumaca()
{
  valor = analogRead(A0);
  if (valor >= 100) 
    {
      Serial.println("Alarme disparado!!!");
      Serial.println(valor);
      Fumaca = true;
      envioTemperaturaUmidade();
      // 30 segundos
      delay(30000);
    } else  {
      Fumaca = false;
    }
}
 
void loop()
{  
  unsigned long tempoAtual = millis();

  sensorFumaca();

  if (!Fumaca) {
      if (tempoAtual - tempoAnterior >= PERIODO) {
      tempoAnterior = tempoAtual;
  
      envioTemperaturaUmidade();
    }
  }
}
