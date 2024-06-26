import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

const users = [];

export default function Crash() {
  const [userCounts, setUserCounts] = useState(null);

  function updateUserCounts() {
    crashlytics().log('Updating user count.');
    try {
      if (users) {
        setUserCounts(userCounts.push(users.length));
      }
    } catch (error) {
      crashlytics().recordError(error);
      console.log(error);
    }
  }

  useEffect(() => {
    crashlytics().log('App mounted.');
    if (users == true) setUserCounts([]);
    updateUserCounts();
  }, []);

  if (userCounts) {
    return (
      <View>
        <Text>There are currently {userCounts[userCounts.length - 1]} users.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Unable to display user information.</Text>
    </View>
  );
}