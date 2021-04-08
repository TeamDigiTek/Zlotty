//Definerer hvilke libraries vi bruger
#include <SPI.h>
#include <WiFi.h>
#include "dht.h"

// Initialize the Wifi client library
WiFiClient client;

//Network SSID (navn) & Password kommenteret ud
char ssid[] = "OnePlus 7T Pro";
// char pass[] = "rfwh3749";
//int keyIndex = 0;            // your network key Index number (needed only for WEP)

//Erklærer at wifi status pt. er IDLE
int status = WL_IDLE_STATUS;


// server address:
char server[] = "5.103.154.120";
//For Patrick på skole-wifi server(10.138.98.238);
//For Patrick Hjemme (5.103.154.120);

// Tid siden sidste server forbindelse, i ms.
unsigned long lastConnectionTime = 0;            

//Forsinkelse mellem check efter ny ordre
const unsigned long postingInterval = 10L * 1000L;

//Hvad der køres i startup
void setup() {

  //Tænder 'serial' og venter på porten åbner
  Serial.begin(9600);

  while (!Serial) {

    ; // Venter på USB forbindelse (HVIS USB BRUGES)

  }

  // Checker om WIFI skjoldet er tilstede:

  if (WiFi.status() == WL_NO_SHIELD) {

    Serial.println("WiFi shield not present. Please add and restart to continue");

    // don't continue:

    while (true);

  }

  //Checker om WIFI modulets skjold er opdateret til en version der kan håndterer websocket
  String fv = WiFi.firmwareVersion();
  if (fv != "1.1.0") {
    Serial.println("Please upgrade the firmware");
  }

  // Hvis ikke WIFI (WL) er connected, forsøg at forbind:

  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid);
    delay(1000);

  }

  // Nu hvor du er forbundet, så console logger vi WIFI status:
  printWifiStatus();
}

void loop() {
  //PRINTER HTML KODEN - DETTE ER FOR DEBUG SKYLD OG OPDATERES SENERE

  while (client.available()) {

    char c = client.read();

    Serial.write(c);

  }

  // Hvis der er gået mere end tid mellem forbindelserne, end den specificerede postingInterval,
  // Forbind da igen
  if (millis() - lastConnectionTime > postingInterval) {

    httpRequest();

  }

}

// Laver en HTTP forbindelse til serveren:
void httpRequest() {

  // For en sikkerhedsskyld lukker vi lige alle forbindelserne.

  // Dette åbner socketen på WIFI skjoldet

  client.stop();

  // Hvis connection er successfuld:
  //Port 3000 for Patricks setup

  if (client.connect(server, 3000)) {

    Serial.println("connecting...");

    // send en HTTP GET/PUT request:

    client.println("GET / HTTP/1.1");

    client.println("Host: 5.103.154.120");

    client.println("Connection: close");

    client.println();

    // Noterer sidste connection tid:

    lastConnectionTime = millis();

  } else {

    // Hvis ikke du kan forbinde:

    Serial.println("connection failed");

  }
}

void printWifiStatus() {

  // Information om WIFI du er forbundet til:

  Serial.print("SSID: ");

  Serial.println(WiFi.SSID());

  // WIFI skjoldets IP address:

  IPAddress ip = WiFi.localIP();

  Serial.print("IP Address: ");

  Serial.println(ip);

  // Signal styrken:

  long rssi = WiFi.RSSI();

  Serial.print("signal strength (RSSI):");

  Serial.print(rssi);

  Serial.println(" dBm");
}