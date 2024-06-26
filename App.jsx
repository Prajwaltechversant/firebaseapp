import { View, Text, Alert,ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import Main from './src/stack/main'
import { firestore } from 'firebase-admin';
import { PermissionsAndroid } from 'react-native';
import crashlytics, { firebase } from '@react-native-firebase/crashlytics';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { firebase } from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useToast } from "react-native-toast-notifications";
import { ToastProvider } from 'react-native-toast-notifications'
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export default function App() {
  const toast = useToast();
  // console.log(toast)

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log(remoteMessage.notification.body)
      try {
        ToastAndroid.showWithGravity(
          remoteMessage.notification.body ,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } catch (error) {
        console.log(error)
      }
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <Main />
      </ToastProvider>
    </SafeAreaProvider>
  )
}