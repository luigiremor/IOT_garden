#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <AnalogReader.h>
#include <LDR.h>
#include <SoilMoisture.h>

// WiFi Configuration
const char *ssid = "SSID";
const char *password = "PASSWORD";

// MQTT Configuration
const char *mqtt_server = "MQTT_SERVER";
const int mqtt_port = 1883;

// Pins
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

// Sensor Objects
LDR ldr(LDR_PIN);
SoilMoisture soilMoisture(SOIL_MOISTURE_PIN);

// Connect to WiFi
void setup_wifi() {
  Serial.begin(115200);
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

// MQTT Callback Function
void callback(char *topic, byte *payload, unsigned int length) {
  String message;
  for (unsigned int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.print("Received message: ");
  Serial.println(message);

  // Relay control based on topic
  if (String(topic) == "irrigation/control") {
    digitalWrite(RELAY_TREE_ZONE, message[0] == '1' ? HIGH : LOW);
    digitalWrite(RELAY_VEGETABLE_ZONE, message[1] == '1' ? HIGH : LOW);
    digitalWrite(RELAY_POT_ZONE, message[2] == '1' ? HIGH : LOW);
  }
}

// Reconnect to MQTT
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("HortaController")) {
      Serial.println("Connected");
      client.subscribe("irrigation/control");
    } else {
      Serial.print("Failed, rc=");
      Serial.print(client.state());
      Serial.println(" trying again in 5 seconds");
      delay(5000);
    }
  }
}

// Initial Setup
void setup() {
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

// Main Loop
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Sensor Readings
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int lightIntensity = ldr.readAverage(10);
  int soilMoistureLevel = soilMoisture.read();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("DHT sensor read error");
  } else {
    // Publish data to MQTT
    char payload[200];
    snprintf(payload, sizeof(payload), "{\"temperature\":%.2f,\"humidity\":%.2f,\"light\":%d,\"soilMoisture\":%d}",
             temperature, humidity, lightIntensity, soilMoistureLevel);
    client.publish("horta/sensors", payload);
    Serial.println(payload);
  }

  delay(5000);
}
