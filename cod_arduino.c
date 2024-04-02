
nPressed = false;
 
#define buttonPin1 2
#define buttonPin2 3
 
 
void setup() {
	pinMode(buttonPin1, INPUT_PULLUP);
	pinMode(buttonPin2, INPUT_PULLUP);
	attachInterrupt(digitalPinToInterrupt(buttonPin1), buttonISR1, FALLING);
	attachInterrupt(digitalPinToInterrupt(buttonPin2), buttonISR2, FALLING);
	Serial.begin(9600);
}
 
 
void loop() {
	if(buttonPressed) {
		delay(3000);
		buttonPressed = false;
	}
}
 
 
void buttonISR1() {
	if (!buttonPressed) {
		buttonPressed = true;
		Serial.print("1");
	}
}
 
 
void buttonISR2() {
	if (!buttonPressed) {
		buttonPressed = true;
		Serial.print("2");
	}
}
