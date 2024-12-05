#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <AnalogReader.h>
#include <LDR.h>
#include <SoilMoisture.h>

// Configurações de WiFi
const char *ssid = "ZAIA";
const char *password = "zaiazaia";

// Configurações do MQTT
const char *mqtt_server = "192.168.0.240";
const int mqtt_port = 1883;

// Pines
#define DHTPIN 15
#define DHTTYPE DHT22
#define RELAY_TREE_ZONE 2
#define RELAY_VEGETABLE_ZONE 4
#define RELAY_POT_ZONE 5
#define LDR_PIN A0
#define SOIL_MOISTURE_PIN A1

WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE);

// Objetos de sensores
LDR ldr(LDR_PIN);
SoilMoisture soilMoisture(SOIL_MOISTURE_PIN);

// Função para conectar ao WiFi
void setup_wifi()
{
  Serial.begin(115200);
  delay(10);
  Serial.println();
  Serial.print("Conectando-se a ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
}

// Função de callback do MQTT
void callback(char *topic, byte *payload, unsigned int length)
{
  String message;
  for (unsigned int i = 0; i < length; i++)
  {
    message += (char)payload[i];
  }
  Serial.print("Mensagem recebida: ");
  Serial.println(message);

  // Controle dos relés com base no tópico
  if (String(topic) == "irrigation/control")
  {
    digitalWrite(RELAY_TREE_ZONE, message[0] == '1' ? HIGH : LOW);
    digitalWrite(RELAY_VEGETABLE_ZONE, message[1] == '1' ? HIGH : LOW);
    digitalWrite(RELAY_POT_ZONE, message[2] == '1' ? HIGH : LOW);
  }
}

// Reconexão ao MQTT
void reconnect()
{
  while (!client.connected())
  {
    Serial.print("Tentando conexão MQTT...");
    if (client.connect("HortaController"))
    {
      Serial.println("Conectado");
      client.subscribe("irrigation/control");
    }
    else
    {
      Serial.print("Falha, rc=");
      Serial.print(client.state());
      Serial.println(" tentando novamente em 5 segundos");
      delay(5000);
    }
  }
}

// Setup inicial
void setup()
{
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  dht.begin();
  pinMode(RELAY_TREE_ZONE, OUTPUT);
  pinMode(RELAY_VEGETABLE_ZONE, OUTPUT);
  pinMode(RELAY_POT_ZONE, OUTPUT);
  digitalWrite(RELAY_TREE_ZONE, LOW);
  digitalWrite(RELAY_VEGETABLE_ZONE, LOW);
  digitalWrite(RELAY_POT_ZONE, LOW);
}

// Loop principal
void loop()
{
  if (!client.connected())
  {
    reconnect();
  }
  client.loop();

  // Leitura dos sensores
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int lightIntensity = ldr.readAverage(10);
  int soilMoistureLevel = soilMoisture.read();

  if (isnan(temperature) || isnan(humidity))
  {
    Serial.println("Erro na leitura do sensor DHT");
  }
  else
  {
    // Publicar dados no MQTT
    char payload[200];
    snprintf(payload, sizeof(payload), "{\"temperature\":%.2f,\"humidity\":%.2f,\"light\":%d,\"soilMoisture\":%d}",
             temperature, humidity, lightIntensity, soilMoistureLevel);
    client.publish("horta/sensors", payload);
    Serial.println(payload);
  }

  delay(5000);
}
