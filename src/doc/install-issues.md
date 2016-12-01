# Running on Android device

## Make sure device appears connected

* Run `adb devices` (i.e. `sudo /home/coteviande/Android/Sdk/platform-tools/adb devices`)
  * If no device is listed, then go in device parameters and enable USB Debugging (Developer's options)
  * If the device is listed **but** displayed as `no permissions`, then kill and restart adb servers

``` Linux
sudo /home/coteviande/Android/Sdk/platform-tools/adb kill-server
sudo /home/coteviande/Android/Sdk/platform-tools/adb start-server
```