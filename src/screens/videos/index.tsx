import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FlatList, Button } from 'react-native';
import VideoItem from '../../components/VideoItem';
import coloPalette from '../../assets/Theme/coloPalette';
import notifee from '@notifee/react-native';
import { sendPushNotification } from '../../components/pushnotification';
import messaging from '@react-native-firebase/messaging';
// import { DeviceInfo, getIpAddress, getDeviceName, } from 'react-native-device-info';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging().requestPermission();
export default function Videos() {
  const [allVideos, setAllVideos] = useState([]);

  const [pageNo, setPageNo] = useState(20)

  const api_key = '7w5m55V3kEjfM539FbdiooTn5omqFe5TTI99Wauwysgz29Tmfr5Qors9';

  const url = `https://api.pexels.com/videos/popular?per_page=${pageNo}`;

  //   console.log(videos);

  async function onDisplayNotification() {
    await notifee.requestPermission()
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
        
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const getData = async () => {
    messaging().getToken().then((i) => console.log(i, "jonh"))
    const response = await axios.get(url, {
      headers: {
        Authorization: `${api_key}`,
      },
    });
    const { data } = response;
    setAllVideos(data.videos);
    const token = await messaging().getToken()
    console.log(token)
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: coloPalette.light.tertiary, justifyContent: 'center', alignItems: 'center', gap: 4, marginVertical: 5 }}>
      <Button title="Display Notification" onPress={() => onDisplayNotification()} />
      {/* <AlertNotificationRoot>
        <View>
          <Button
            title={'toast notification'}
            onPress={() =>
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Congrats! this is toast notification success',
              })
            }
          />
        </View>
      </AlertNotificationRoot> */}
      <FlatList
        data={allVideos}
        renderItem={({ item }) => <VideoItem item={item}
        />}
        numColumns={2}
      />
    </View>
  );
}
