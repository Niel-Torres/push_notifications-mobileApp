# Push notifications - Capacitor

<strong>¡Hi world!</strong> This it's a simple mobile application built with Ionic and Capacitor to demonstrate how to register for and receive "push-notifications" on Android/iOS. 

## 💻 Requirements

<ul>
  <li>NPM</li>
  <li>Android Studio & SDK Manager API +30</li>
  <li>Firebase: Create account and project</li>
</ul>  

## ⚙Installation


## Install Ionic & Angular:
```
npm install -g @ionic/cli
npm install -g @angular/cli@11.2.7
```

## Install dependencies:

```
npm install
```

Compile code to later copy them to platforms (Android / iOS):
```
ionic build
```

Create android platform (Native compilation code)
```
npx cap add android
```


## Android Push Preparation

1. Create account firebase:

Create account firebase & generate json for connect with your app (android / ios)
Add your `google-services.json` in `android/app/`.

- Create project:
<img src="https://user-images.githubusercontent.com/15156545/145823183-504cc197-ccff-4132-a9f7-0616ec241b80.png" width="500">

- Add Firebase to Android:
<img src="https://user-images.githubusercontent.com/15156545/145824986-aee28fca-fe1f-45dc-aa17-97c5c4ac13bd.png" width="500">

- It's very important that your `android package name` is equal to `appId` of the capacitor file of your project: `capacitor.config.json`.
<img src="https://user-images.githubusercontent.com/15156545/145826094-2c830010-fa6a-48c0-a79e-4722e3227c6b.png" width="500">

<img src="https://user-images.githubusercontent.com/15156545/145825215-fe97327f-ffc6-4ac4-b89b-42af97915e95.png" width="500">

- Download your `google-services.json` and add in your project in `android/app/`
<img src="https://user-images.githubusercontent.com/15156545/145827072-9644fafe-f80a-4961-818d-94186ceca0a7.png" width="500">


2. Add in build.gradle:

In your `android/app/build.gradle`

```gradle
...
apply plugin: 'com.google.gms.google-services'
```


```gradle
    ...
    dependencies {
        ...
            implementation platform('com.google.firebase:firebase-bom:29.0.1')
            implementation('com.google.firebase:firebase-iid')
            implementation 'com.google.firebase:firebase-messaging'
        ...
    }
```

In your `android/build.gradle`

```gradle
 buildscript {
    ...
    dependencies {
        ...
        classpath 'com.android.tools.build:gradle:4.2.1'
        classpath 'com.google.gms:google-services:4.3.10'
        classpath 'com.google.firebase:firebase-messaging:21.0.1'
        ...
    }
 }
```


3. Copy all changes to an android platform
```
npx cap sync
```

4. Open android project:
```
npx cap open android
```

5.Finally `Sync project with gradle files` > Android studio and RUN App.


That it's all...



** Additional note (summary of push notifications code in angular) :

In `angular` the code for `register and receive push notifaction` is in `src>app>home>home.page.ts`.

- 4 events that are listening when a device is registered or a push notification is sent.

```typescript
    // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
      (token: Token) => {
          alert('Push registration success, token: ' + token.value);
        }
      );
  
      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          alert('Error on registration: ' + JSON.stringify(error));
        }
      );
  
      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          alert('Push received: ' + JSON.stringify(notification));
        }
      );
  
      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        }
      );
```

- 1 function to "request permissions & register device with token". (On Android it doesn't prompt for permission because you can always receive push notifications, but on iOS it depends on the user's selection.

```typescript
 requestPermissions(){
    if(this.platform.is('capacitor')){
      PushNotifications.requestPermissions().then(result => {
        console.log("PushNotifications.requestPermissions()");
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
    } else {
        console.log("PushNotifications.requestPermissions() -> Its a not device mobile")
    }
    
  }

```

** skeleton project with functionalities:
- Register and generate token for push notifications.
- Subscribe by topics.
<img src="https://user-images.githubusercontent.com/15156545/151973466-b755d2e6-80b2-4511-8b3c-e57862d2b62d.JPG" width="250">

