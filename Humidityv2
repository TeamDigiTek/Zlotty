#include "dht.h"
#define dht_apin A0 // Analog Pin sensor is connected to
dht DHT;
int oldTemp = 0;
 
void setup(){
  pinMode(5, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  Serial.begin(9600);
  delay(500);//Delay to let system boot
  Serial.println("DHT11 Humidity & temperature Sensor\n\n");
  delay(1000);//Wait before accessing Sensor
  //LED CHECK
   digitalWrite(5, HIGH);
   digitalWrite(9, HIGH);
   delay(1500);
   digitalWrite(5, LOW);
   digitalWrite(9, LOW);
}//end "setup()"
 
void loop(){
  //Start of Program 
    DHT.read11(dht_apin);
    int currTemp = DHT.temperature;
    Serial.print("Stored in currTemp: ");
    Serial.println(currTemp);
    if (currTemp > oldTemp) {
      Serial.println("Getting hotter.");
      digitalWrite(9, HIGH);
      digitalWrite(8, LOW);

    }
    else if (currTemp < oldTemp) {
      Serial.println("Getting cooler.");
      digitalWrite(9, LOW);
      digitalWrite(8, HIGH);
    }
    else if (currTemp == oldTemp) {
      Serial.println("No change.");
      digitalWrite(9, HIGH);
      digitalWrite(8, HIGH);
    }
    else {

    }
    Serial.print("Current humidity = ");
    Serial.print(DHT.humidity);
    Serial.print("%  ");
    Serial.print("temperature = ");
    Serial.print(DHT.temperature); 
    Serial.println("C  ");
    int oldTemp = currTemp;
    Serial.print("Stored in oldTemp: ");
    Serial.println(oldTemp);
    delay(5000);//Wait 5 seconds before accessing sensor again.
 
  //Fastest should be once every two seconds.
 
}// end loop()
