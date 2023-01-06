#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <BlynkSimpleEsp32.h>

#define BLYNK_TEMPLATE_ID ""
#define BLYNK_DEVICE_NAME ""
#define BLYNK_AUTH_TOKEN ""

char auth[] = BLYNK_AUTH_TOKEN;

RF24 radio(4, 5); // CE, CSN

const byte address[6] = "00001";

char ssid[] = "";
char pass[] = "";

const char *serverName = "";

String temperature;
String humidity;
bool smoke;

struct MyData
{
  float Temperature;
  float Humidity;
  bool Fumaca;
};

MyData data;

WiFiClient client;
HTTPClient http;

void setupWiFi()
{
  Serial.print("Connecting to ");
  Serial.println(ssid);
  Serial.println();
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
}

void setupRF()
{
  radio.begin();
  radio.setChannel(127);
  radio.setDataRate(RF24_2MBPS);
  radio.setPALevel(RF24_PA_HIGH);
  radio.openReadingPipe(1, address);
  radio.startListening();
  Serial.println("Receiver data from RF started....");
}

void setup()
{
  Serial.begin(115200);
  setupWiFi();
  setupRF();
}

void sendBlynkData(int numberPort, String data)
{
    String serverNameBlynk = "http://blynk.cloud/external/api/update?token="+String(auth)+"&v"+numberPort+"="+data+"";

    http.begin(client, serverNameBlynk);

    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.GET();

    Serial.print("HTTP Blynk Response code: ");
    Serial.println(httpResponseCode);  
    
    http.end();
}

void sendServerData()
{
  // Your Domain name with URL path or IP address with path
  http.begin(client, serverName);

  // Specify content-type header
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST("{\"temperature\":\""+temperature+"\",\"humidity\":\""+humidity+"\",\"smoke\":\""+smoke+"\"}");

  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);

  http.end();
}

void loop()
{
  if (radio.available())
  {
    radio.read(&data, sizeof(MyData));

    temperature = String(data.Temperature);
    humidity = String(data.Humidity);
    smoke = data.Fumaca;
    
    Serial.println();

    Serial.print("Temperature = ");
    Serial.print(data.Temperature);
    Serial.println("ºC");

    Serial.print("Humidity = ");
    Serial.print(data.Humidity);
    Serial.println("%");

    Serial.print("Smooke = ");
    Serial.print(data.Fumaca);

    Serial.println();

    sendServerData();
    sendBlynkData(5, String(temperature));
    sendBlynkData(6, String(humidity));
    sendBlynkData(4, String(smoke));
  }
}
