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
npx cap open <android or ios>
```

5.Finally `Sync project with gradle files` > Android studio and RUN App.


** Note:

In `angular` the code for `register and receive push notifaction` is in `src>app>home>home.page.ts`.










  
