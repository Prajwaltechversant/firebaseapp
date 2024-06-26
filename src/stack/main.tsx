import { View, Text, Linking, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Signin Page';
import Videos from '../screens/videos';
import Signup from '../screens/signup';
import auth from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Task from '../screens/Task';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Crash from '../screens/crash';
import LinkingSample from '../screens/deepLink';
import messaging from '@react-native-firebase/messaging';
import { SwipeRatingProps } from '@rneui/base';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Videos' component={Videos} />
      <Tab.Screen name='Task' component={Task} />
      <Tab.Screen name='Crash' component={Crash} />
      <Tab.Screen name='Link' component={LinkingSample} />
    </Tab.Navigator>
  );
}

export default function Main() {

  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const { signOut } = GoogleSignin;

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '618701364163-6g7m0qmppjsu1o2dm7v53uvsei2eojha.apps.googleusercontent.com', // Your webClientId from Google Cloud Console
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const logout = async () => {
    try {
      await signOut();
      await auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

  const linking:LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: ['myapp://','https://myapp.com'],
    config: {
      screens: {
        Home: {
          screens: {
            Videos: 'videos',
            Task: 'task',
            Crash: 'crash',
            Link: 'linkSample',
          },
        },
        Signup: 'signup',
        Login: 'login',
      },
    },

    subscribe(listener:(url:string)=>void) {
      const onReceiveURL = ({ url }:{url:string}) => listener(url);
      const subscription = Linking.addEventListener('url', onReceiveURL);
      const unsubscribeNotification = messaging().onNotificationOpenedApp(
        (message) => {
          const url = message.data?.navigationID;
          if (url === 'loginAction') {
            const deepLinkURL = 'myapp://linkSample'
            // console.log(typeof (deepLinkURL))
            listener(deepLinkURL);
          }
        }
      );
      return () => {
        subscription.remove();
        unsubscribeNotification()
      }
    }
  }
  useEffect(() => {
    const link = async () => {
      const res = await Linking.getInitialURL()
      if (res) {
        Linking.openURL(res)
      }
    }
    link()
  }, [])
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='Login' component={Login} />
          </>
        ) : (
          <>
            <Stack.Screen
              name='Home'
              component={TabNav}
              options={{
                headerRight: () => (
                  <Text style={{ color: 'red' }} onPress={logout}>
                    Logout
                  </Text>
                ),
              }}
            />
            <Stack.Screen name='Crash' component={Crash} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
