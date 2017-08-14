    
#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>

#define USE_SERIAL Serial

ESP8266WiFiMulti WiFiMulti;
    
    #define D0 16
    #define D1 5
    #define D2 4
    #define D3 0
    #define D4 2
    #define D5 14
    #define D6 12
    #define D7 13


//   
    String urlTimeStamp = "";
    String urlFirstCall = String("0");
    String urlFirstHalf = String("http://ps.pndsn.com/subscribe/sub-c-cf99383a-7714-11e7-98e2-02ee2ddab7fe/theled/0/");
    String urlSecondHalf = String("/2a80a1c6-8743-46d8-aea6-eae26aabc454");
    
    boolean isFirstCall = true;
    

    
    void setup() {
      Serial.begin(115200);
//      pinMode(D1, INPUT);        // Set pin D1 to input mode (Put Active High PushButton on D1)
      pinMode(D2, OUTPUT);    // Set pin D2 to input mode (Put LED & serial resistor 330 ohms on D2)
      USE_SERIAL.println();
      USE_SERIAL.println();
      USE_SERIAL.println();

      for(uint8_t t = 4; t > 0; t--) {
          USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
          USE_SERIAL.flush();
          delay(1000);
      }

      WiFiMulti.addAP("pootdooter", "minenotyours");
    }

   void loop() {   
//         Serial.println(digitalRead(D2));        // If HIGH, then turn LED on.
         if(digitalRead(D2)==1){
          getData();
         }
     
    }

    void getData(){
      Serial.println("this would be get request");
       if((WiFiMulti.run() == WL_CONNECTED)) {
          
          HTTPClient http;

//          USE_SERIAL.print("[HTTP] begin...\n");
          // configure traged server and url
          //http.begin("https://192.168.1.12/test.html", "7a 9c f4 db 40 d3 62 5a 6e 21 bc 5c cc 66 c8 3e a1 45 59 38"); //HTTPS
          if(isFirstCall){
            http.begin(urlFirstHalf + urlFirstCall + urlSecondHalf); //HTTP
            Serial.println("first call");
          }
          else{
            Serial.println("time stamp");
            http.begin(urlFirstHalf + urlTimeStamp + urlSecondHalf); //HTTP
          }
//          http.begin("http://ps.pndsn.com/subscribe/sub-c-cf99383a-7714-11e7-98e2-02ee2ddab7fe/theled/0/0/2a80a1c6-8743-46d8-aea6-eae26aabc454"); //HTTP

//          USE_SERIAL.print("[HTTP] GET...\n");
          // start connection and send HTTP header
          int httpCode = http.GET();

          // httpCode will be negative on error
          if(httpCode > 0) {
              // HTTP header has been send and Server response header has been handled
              USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);

              // file found at server
              if(httpCode == HTTP_CODE_OK) {
                  String payload = http.getString();
                  USE_SERIAL.println(payload);
                  USE_SERIAL.println(payload.length());
                  urlTimeStamp = payload.substring((payload.length()-19), (payload.length()-2));
                  USE_SERIAL.println(urlTimeStamp);
                  
              }
          } else {
              USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
          }

          http.end();
          isFirstCall = false;
          delay(1000);
         

      }
      return;
    }
    

