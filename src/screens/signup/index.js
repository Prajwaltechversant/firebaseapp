import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';
import auth from '@react-native-firebase/auth'


export default function Signup({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  // const navigation = useN



  const [loginData, setLoginData] = useState(
    { email: '', password: '' }
  );



  const setShowPasswordfn = () => {
    setShowPassword(!showPassword);
  };

  const registerUser = async () => {
    const { email, password } = loginData;
    if (email && password) {
      try {
        await auth().createUserWithEmailAndPassword(email, password)
        navigation.navigate('login')
      } catch (err) {
        console.log(err)
      }
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/000/585/540/original/m-logo-business-template-vector-icon.jpg',
          }}
          width={100}
          height={100}
        />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}> email </Text>
          <TextInput
            placeholder="Enter your username"
            onChangeText={(e) => setLoginData({ ...loginData, email: e })}
            style={styles.inputBox}
            value={loginData.email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}> Password </Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Enter your Password"
              secureTextEntry={!showPassword}
              style={styles.inputBox}
              onChangeText={(e) => setLoginData({ ...loginData, password: e })}
              value={loginData.password}
            />
            <TouchableOpacity onPress={setShowPasswordfn}>
              <AntDesign name="eye" style={styles.icon} color="green" />
            </TouchableOpacity>
          </View>
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>

        <View style={styles.loginBox}>
          <TouchableOpacity onPress={registerUser}>
            <Text style={{ color: 'white' }}>Signup</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupBox}>
          <View>
            <Text style={styles.signuptext}>Create Account</Text>
          </View>
          <View style={styles.signupButton}>
            <TouchableOpacity onPress={()=>navigation.push('Login')}>
              <Text style={{ color: 'blue' }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
