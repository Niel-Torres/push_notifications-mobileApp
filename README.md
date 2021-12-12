# Push notifications - Capacitor

<strong>¡Hi world!</strong> This it's a simple mobile application built with Ionic and Capacitor to demonstrate how to register for and receive "push-notifications" on Android/iOS. 

## 💻 Requerimientos

<ul>
  <li>NPM (versión node: v14.18.2)</li>
  <li>Android Studio</li>
  <li>XCode</li>
  <li>Account Firebase</li>
</ul>  

## 👨 Installation

### NPM

Instalar Ionic & Angular:
```
npm install -g @ionic/cli
npm install -g @angular/cli@11.2.7
```

Instalar las dependencias del proyecto:

```
npm install
```

Debe crear el código y los activos de su aplicación para copiarlos en plataformas individuales (Android e iOS). Para compilar el código y los activos, ejecute:
```
ionic build
```

Añadir plataforma android (código de compilación nativo)
```
npx cap add android
```

## Create account firebase
Create account firebase y generate json for connect with your app (android & ios)
Add your `google-services.json` in `android/app/`.


## Android manual Installation

**NOTE: 

Añade las siguientes dependencias en build.gradle:

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

Copiar todos los cambios a una plataforma android
```
npx cap sync
```
Y si desea copiar código hibrido:
```
npx cap copy
```

Para crear la aplicación desde Android Studio, abra el editor usando:
```
npx cap open <android or ios>
```

**NOTE: 
Como es una app en blanco, si te da error instala esto:
npm install com-darryncampbell-cordova-plugin-intent
npm install @ionic-native/web-intent

  
👨🏾‍💻<span>Proyecto realizado por Niel Torres<span>
