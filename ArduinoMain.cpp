//Definerer hvilke libraries vi bruger
#include <SPI.h>
#include <WiFi.h>


// Initialize the Wifi client library
WiFiClient client;

//Network SSID (navn) & Password kommenteret ud
char ssid[] = "Eucnvs-Guest";
// char pass[] = "rfwh3749";
//int keyIndex = 0;            // your network key Index number (needed only for WEP)

//Erklærer at wifi status pt. er IDLE
int status = WL_IDLE_STATUS;

boolean save = false;

unsigned long lastConnectionTime = 0;            // last time you connected to the server, in milliseconds

const unsigned long postingInterval = 10L * 1000L; // delay between updates, in milliseconds

String recievedData = "";

// server address:
char server[] = "10.138.100.169";
//For Patrick på skole-wifi server(10.138.98.238);
//For Patrick Hjemme (5.103.154.120);

//Hvad der køres i startup
void setup() {

  pinMode(5, OUTPUT);
  pinMode(9, OUTPUT);
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

  }

  // Nu hvor du er forbundet, så console logger vi WIFI status:
  printWifiStatus();
}

void loop() {

  // if there's incoming data from the net connection.

  // send it out the serial port.  This is for debugging

  // purposes only:

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

    // if ten seconds have passed since your last connection,
    // then connect again and send data:
    if (millis() - lastConnectionTime > postingInterval) {
      httpRequest();
      Serial.println(recievedData);
      Zlotty(recievedData);
      recievedData.remove(0, recievedData.length());
    }
}

// this method makes a HTTP connection to the server:
void httpRequest() {

  // close any connection before send a new request.

  // This will free the socket on the WiFi shield

  client.stop();

  // if there's a successful connection:

  if (client.connect(server, 3000)) {

    Serial.println();
    
    Serial.println("connecting...");

    // send the HTTP PUT request:

    client.println("GET /arduino HTTP/1.1");

    client.print("Host: ");

    client.println(server);

    client.println("User-Agent: ArduinoWiFi/1.1");

    client.println("Connection: close");

    client.println();

    // note the time that the connection was made:

    lastConnectionTime = millis();

  } else {

    // if you couldn't make a connection:

    Serial.println("connection failed");

  }
}

void printWifiStatus() {

  // print the SSID of the network you're attached to:

  Serial.print("SSID: ");

  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:

  IPAddress ip = WiFi.localIP();

  Serial.print("IP Address: ");

  Serial.println(ip);

  // print the received signal strength:

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
      digitalWrite(9, HIGH);
      digitalWrite(5, LOW);
      break;
    case 2:
      Serial.print("Din case blev nr.");
      Serial.println(val);
      digitalWrite(9, LOW);
      digitalWrite(5, HIGH);
      break;
    case 3:
      Serial.print("Din case blev nr.");
      Serial.println(val);
      digitalWrite(9, HIGH);
      digitalWrite(5, HIGH);
      break;
    case 4:
      Serial.print("Din case blev nr.");
      Serial.println(val);
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
