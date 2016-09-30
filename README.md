# Cordova plugin for VoIP push notifications

## TL;DR
Cordova plugin for receiving VoIP push notifications on **iOS 8.0+ only**.

## Installation
_I'll add npm installation step once I do that._

`ionic plugin add http`

## Usage
```
var push = VoIPPushNotification.init();

push.on('registration', function(data) {
    log("[Ionic] registration callback called");
    log(data);

    //data.deviceToken;
    //do something with the device token (probably save it to your backend service)
});

push.on('notification', function(data) {
    log("[Ionic] notification callback called");
    log(data);

    // do something based on received data
});

push.on('error', function(e) {
    log(e);
});
```

## Running the demo

### Ionic setup
Clone this repo:

`git clone https://github.com/Hitman666/cordova-ios-voip-push.git`

CD into the cloned project and into the Ionic demo project:

`cd cordova-ios-voip-push && cd ionicDemo`

Install the dependencies:

`npm install && bower install`

Install all the plugins and platforms (please note that this process may take a while to complete):

`ionic state reset`

Add the plugin:

`ionic plugin add ../thePlugin/VoIPPushNotification`

Prepare the project:

`ionic prepare ios`

Open the project in XCode by going into `platforms/ios` and opening up the `pluginTest.xcodeproj` file.

### XCode setup
If you don't have an AppID and VoIP push certificate created in your [Apple developer account](https://developer.apple.com/account/), you can do so by following my instructions from the [How to create a native iOS app that can receive VoIP push notifications](http://www.nikola-breznjak.com/blog/ios/create-native-ios-app-can-receive-voip-push-notifications/) tutorial.

_Take your time to do that an then come back, I'll wait._

To use the VoIP push in the app, you need to turn ON the `Background Modes` for your app and check few of the checkboxes:

![](http://i.imgur.com/U8Xcrlj.png)

Make sure you select the following options:

+ Audio, Airplay, and Picture in Picture
+ Voice over IP
+ Background fetch
+ Remote notifications

Next, you need to add PushKit framework to your project:

![](http://i.imgur.com/NdLMkC4.png)

Also (_yeah, I know, a lot of setup_), you need to make sure that you set the appropriate Bundle Identifier. _You should have read about this in the [tutorial](http://www.nikola-breznjak.com/blog/ios/create-native-ios-app-can-receive-voip-push-notifications/) I linked above._ 



## Long reads; for those who care

In my [previous tutorial](http://www.nikola-breznjak.com/blog/ios/create-native-ios-app-can-receive-voip-push-notifications/) I showed how to create a native iOS app with Swift (ObjectiveC code also available) that can receive VoIP push notifications sent with Houston, custom PHP script or through Amazon SNS.

In this tutorial I'm going to present to you the Cordova plugin that does the same thing; it allows hybrid iOS applications to receive the VoIP push notifications.

> Disclaimer:
> This tutorial plugin was inspired by the official [phonegap-plugin-push plugin](). Also, I don't 'do' ObjectiveC for a living (but I may change my mind after completing this :)), so I would really appreciate the constructive feedback in making this plugin better, so I look forward for your comments and potential pull requests.

## Changelog
_30.09.2016:_ Updated the plugin code (Objective C and JS) example by following the practice of the official [phonegap-push-plugin](https://github.com/phonegap/phonegap-plugin-push) repo. [Open sourced](https://github.com/Hitman666/cordova-ios-voip-push) the plugin to get valuable feedback and documented how to build/test it.

_21.09.2016:_ Added Objective C example

## Notes
> I followed [this tutorial](http://moduscreate.com/writing-a-cordova-plugin-in-swift-for-ios/) and below are my notes from it and some other resources like [official docs](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/plugin.html).

Anyone looking to learn more about plugin building for Cordova can check out those links as I won't go into the details of Cordova plugin building in this document.
 
I've added this [project to Github](https://git.teltech.co/nikola/ionicPluginTest) for further reference.

Our project on Github has 'more' features that are valid for us. Namely, I made the functions which create the contact and which call the webhookr service upon receiving the VoIP push notification.

### Create a new scaffolded plugin project
`npm install -g plugman`

`plugman create --name ModusEchoSwift --plugin_id com-moduscreate-plugins-echoswift --plugin_version 0.0.1 --path modusechopluginswift`

### www/sourceFile.js
```
var exec = require('cordova/exec');

exports.coolMethod = function(arg0, success, error) {
    exec(success, error, "ModusEchoSwift", "coolMethod", [arg0]);
};
```

### Bridging Header
Since we're writing or plugin in Swift and Cordova is still in Objective-C, we need to create a so-called Bridging Header. We can make it easier for us by adding the following line to the `plugin.xml` file:

`<dependency id="cordova-plugin-add-swift-support" version="1.3.2"/>`

inside the `<platform name="ios">` block.

The project, for further reference, is [here](https://github.com/akofman/cordova-plugin-add-swift-support).

### Ionic instead of Cordova
The tutorial can be followed to the line, except for when you're creating the build you should use `ionic prepare ios` instead of trying to build it - we'll handle that within XCode.

### Running the demo app
First, clone the project and do `npm install && bower install`. After that do `ionic prepare ios`, open the project in Xcode (the XCode project can be found in the `platforms/ios` folder) and run it. 

In the XCode console you should see

![](http://i.imgur.com/x5mWI90.png)

and on your device:

![](http://i.imgur.com/qJjx9FC.jpg)

You can send VoIP pushes to yourself by editing the `simplepush.php` file (in the `pushSendingScript` folder). Just make sure you add your own device id that you'll see show up on your phone.

## Conclusion
I hope this plugin will come handy to you. Since I don't 'do' ObjectiveC for a living I would really appreciate the constructive feedback in making this plugin better, so I look forward for your comments and optential pull requests.