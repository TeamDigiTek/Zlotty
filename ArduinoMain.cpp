//Definerer hvilke libraries vi bruger
#include <SPI.h>
#include <WiFi.h>
#include <dht.h>

#define dht_apin A0

dht DHT;

//Definerer blæserens (motor) pin og motorSpeed;
int motorPin = 8;
int mSpeed = 100;


//LED PINS!!!
int gron = 5;
int rod = 2;
int hvid = 3;
int bla = 4;

// Initialize the Wifi client library
WiFiClient client;

//Network SSID (navn) & Password kommenteret ud
char ssid[] = "Eucnvs-Guest";
// char pass[] = "rfwh3749";
//int keyIndex = 0;            // your network key Index number (needed only for WEP)

//Erklærer at wifi status pt. er IDLE
int status = WL_IDLE_STATUS;

//Boolean til om vi skal gemem JSON data fra Patricks websocket
boolean save = false;


//Variable til at gemme sidst vi var connected til websocket - starter selvfølgelig på 0 da vi ikke har været connected. (Er i millisekunder)
unsigned long lastConnectionTime = 0;

//Tid mellem forbindelser til websiden (x1000 for at få det i sekunder, fremfor milli)
const unsigned long postingInterval = 10L * 1000L;

//Den string som vi har JSON der er cuttet til og lavet til string, i.
String recievedData = "";

// server address:
char server[] = "10.138.99.56";
//For Patrick på skole-wifi server(10.138.98.238);
//For Patrick Hjemme (5.103.154.120);

//Hvad der køres i startup
void setup() {

  //2 stk. LED på hhv. pin 5 og 9, samt en motor på pin 8
  pinMode(gron, OUTPUT);
  pinMode(rod, OUTPUT);
  pinMode(hvid, OUTPUT);
  pinMode(bla, OUTPUT);
  analogWrite(8, mSpeed);
  //Tænder 'serial' og venter på porten åbner
  Serial.begin(9600);


  //LED CHECK
  Serial.println("LED START");
  digitalWrite(gron, HIGH);
  digitalWrite(rod, HIGH);
  digitalWrite(hvid, HIGH);
  digitalWrite(bla, HIGH);
  delay(2000);
  digitalWrite(gron, LOW);
  digitalWrite(rod, LOW);
  digitalWrite(hvid, LOW);
  digitalWrite(bla, LOW);
  Serial.println("LED SLUT");
  //Mens vi ikke er forbundet:
  while (!Serial) {// Venter på USB forbindelse (HVIS USB BRUGES)
  };

  // Checker om WIFI skjoldet er tilstede:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi skjoldet er ikke tilstede - Det ville være klogt at tilføje det. :)");

    //Så længe det er true, så venter vi.
    while (true);
  }

  //Checker om WIFI modulets skjold er opdateret til en version der kan håndterer websocket
  String fv = WiFi.firmwareVersion();
  if (fv != "1.1.0") {
    Serial.println("Dit skjold er ikke opdateret til at understøtte websocket - Opdater det, og prøv igen");
  }

  // Hvis ikke WIFI (WL) er connected, forsøg at forbind:
  while (status != WL_CONNECTED) {
    Serial.print("Forbinder til netværk: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid);

  }

  // Nu hvor du er forbundet, så console logger vi WIFI status:
  printWifiStatus();
}

void loop() {

  //Mens vi er forbundet til websocket, så alt vi modtager kørers igennem denne algoritme
  //Algoritmens formål er at skære headsers væk fra JSON, så vi kun får de keys og values vi ønsker
  while (client.available()) {
    char c = client.read();
    if (c == '{') {
      save = true;
    } else if (c == '}') {
      save = false;
    } else {
 
    }

    if (save == true) {
      recievedData += String(c);
    } else {
      //...
    }
  }

    // Hvis der er gået lægnere end 'posing interval' siden sidste request
    // så forbind igen, og kør nedestående: 
    if (millis() - lastConnectionTime > postingInterval) {
      DHT.read11(dht_apin);
      Serial.print("Den nuværende temperatur er: ");
      Serial.println(DHT.temperature);
      //Kører connect funktionen til websocket
      httpRequest();
      //Skriver hvad vi har modtaget i console/serial for debugs skyld
      Serial.println(recievedData);
      //Kører en funktion der handler ud fra det vi modtog
      Zlotty(recievedData);
      //Sletter modtaget data fra recievedData, så vi er klar til næste request
      recievedData.remove(0, recievedData.length());
    }
}

// Kører en HTTP connection til websocket:
void httpRequest() {

  //Sikrer os at vi har lukket alle forbindelser der tidligere var åben
  client.stop();

  // Hvis vi får en stabil forbindelse

  if (client.connect(server, 3000)) {

    Serial.println();

    // sender HTTP GET request:

    client.println("GET /arduino HTTP/1.1");

    client.print("Host: ");

    client.println(server);

    client.println("User-Agent: ArduinoWiFi/1.1");

    client.println("Connection: close");

    client.println();

    // noterer sidste connection tid

    lastConnectionTime = millis();

  } else {

    // Hvis nu, vi desværre, ikke kan connecte:

    Serial.println("Fejl: Ingen forbindelse");

  }
}


//Skriver info om vores WiFi
void printWifiStatus() {

  // Skriver WIFI SSID:

  Serial.print("SSID: ");

  Serial.println(WiFi.SSID());

  // WIFI skjoldets IP:

  IPAddress ip = WiFi.localIP();

  Serial.print("IP Address: ");

  Serial.println(ip);

  // Signal styrken:

  long rssi = WiFi.RSSI();

  Serial.print("signal strength (RSSI):");

  Serial.print(rssi);

  Serial.println(" dBm");
}



void Zlotty(String data) {
  int posStart = data.indexOf(':');
  int posSlut = data.indexOf(',');
  String valString = data.substring(posStart+1, posSlut);
  int val = valString.toInt();
  Serial.println("Din substring blev til: " + valString);
  switch (val) {
    case 1:
      Serial.print("Din case blev nr.");
      Serial.println(val);
      digitalWrite(gron, HIGH);
      digitalWrite(rod, LOW);
      digitalWrite(hvid, LOW);
      digitalWrite(bla, LOW);
      break;
    case 2:
      Serial.print("Din case blev nr.");
      Serial.println(val);
      digitalWrite(gron, LOW);
      digitalWrite(rod, HIGH);
      digitalWrite(hvid, LOW);
      digitalWrite(bla, LOW);
      break;
    case 3:
      Serial.print("Din case blev nr.");
      Serial.println(val);
      digitalWrite(gron, LOW);
      digitalWrite(rod, LOW);
      digitalWrite(hvid, HIGH);
      digitalWrite(bla, LOW);
      break;
    case 4:
      Serial.print("Din case blev nr.");
      Serial.println(val);
      digitalWrite(gron, LOW);
      digitalWrite(rod, LOW);
      digitalWrite(hvid, LOW);
      digitalWrite(bla, HIGH);
      break;
    case 5:
      Serial.print("Din case blev nr.");
      Serial.println(val);
      break;
    case 6:
      Serial.print("Din case blev nr.");
      Serial.println(val);
      break;
    case 7:
      Serial.print("Din case blev nr.");
      Serial.println(val);
      break;
    case 8:
      Serial.print("Din case blev nr.");
      Serial.println(val);
      break;
    default:
      Serial.print("Din case blev nr.");
      Serial.println("Default");
      digitalWrite(9, LOW);
      digitalWrite(5, LOW);
      break;
      
  }
}