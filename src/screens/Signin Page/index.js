import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';
import auth from '@react-native-firebase/auth';
import firestore, { Filter, and } from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { sendPushNotification } from '../../components/pushnotification';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import axios from 'axios';
import crashlytics from '@react-native-firebase/crashlytics';
import { request, PERMISSIONS,RESULTS } from 'react-native-permissions';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { Button } from 'react-native-paper';


export default function Login({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const [changeTomobileAuth,setChangeTomobileAuth] = useState(false)

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '618701364163-6g7m0qmppjsu1o2dm7v53uvsei2eojha.apps.googleusercontent.com', // Your webClientId from Google Cloud Console
  //   });
  // }, []);
  // await messaging().registerDeviceForRemoteMessages();
  useEffect(()=>{
    const ge = async()=>{
      try{
        console.log(await messaging().getToken())
      }
      catch(err){
        console.log(err)
      }   
    }
    ge()
  },[])

  const handleLogin = async () => {
    const { email, password } = loginData;
    const token = await messaging().getToken()
    console.log(token, 'token');
    const query = firestore().collection('users')
    .where('email', '==', email)
    try {
      const querySnapshot = await query.get();
      // console.log(querySnapshot.docs[0]._data.token)
      // console.log(querySnapshot.docs.length)
    } catch (error) {
      console.error('Error querying Firestore:', error);
    }
    if (!email || !password) {
      Alert.alert('Please fill the form completely');
    } else {
      try {
        const res = await auth().signInWithEmailAndPassword(email, password);
        const querySnapshot = await query.get();
        if(querySnapshot.docs.length===0){
          firestore()
            .collection('users')
            .add({
              token:token,
              email:email
            }).then(console.log('done'))
        }
        else{
          sendPushNotification(querySnapshot.docs[0]?._data.token)
          firebase.crashlytics().log('Testing a crash');
        }
        navigation.replace('Home');
      } catch (err) {
        console.log(err);
        Alert.alert('Login Error', err.message);
      }
    }
  };

  const aaa = async () => {
    const token = await messaging().getToken()
    sendPushNotification(token)
    console.log(token, 'aa')

  }
  useEffect(() => {
    aaa()
  }, [])
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      // navigation.replace('Home');
      console.log(googleCredential.token);
      const token = await messaging().getToken()
      sendPushNotification(token)

    } catch (error) {
      console.error('Google Sign-In error:', error);
      Alert.alert('Sign-In Error', 'Unable to sign in with Google. Please try again later.');
    }
  };


  async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    return auth().signInWithCredential(facebookCredential);
  }

  const [loginPhoneData, setLoginPhoneData] = useState();

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  const signinWithMobileNumber = async()=>{
    const mob = `+91${loginPhoneData}`
    const confirmation = await auth().signInWithPhoneNumber(mob);
    setConfirm(confirmation);
    console.log(confirmation)
  }


  const confirmVerificationCode = async()=>{

    try{
      await confirm.confirm(code)
    }
    catch(err){
      console.log(err)
    }

  }

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
       {!changeTomobileAuth ?
         <>
         <View style={styles.inputContainer}>
           <Text style={styles.inputLabel}>Email</Text>
           <TextInput
             placeholder="Enter your email"
             onChangeText={(e) => setLoginData({ ...loginData, email: e })}
             style={styles.inputBox}
             value={loginData.email}
           />
         </View>
         <View style={styles.inputContainer}>
           <Text style={styles.inputLabel}>Password</Text>
           <View style={styles.passwordContainer}>
             <TextInput
               placeholder="Enter your Password"
               secureTextEntry={!showPassword}
               style={styles.inputBox}
               onChangeText={(e) => setLoginData({ ...loginData, password: e })}
               value={loginData.password}
             />
             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
               <AntDesign name="eye" style={styles.icon} color="green" />
             </TouchableOpacity>
           </View>
           {error && <Text style={{ color: 'red' }}>{error}</Text>}
         </View>
 
         <View style={styles.loginBox}>
           <TouchableOpacity onPress={handleLogin}>
             <Text style={{ color: 'white' }}>Login</Text>
           </TouchableOpacity>
         </View>
         </>
         :
         <>
         <View style={styles.inputContainer}>
           <Text style={styles.inputLabel}>Mobile Number</Text>
           <TextInput
             placeholder="Enter your mobile number"
             onChangeText={(e) => setLoginPhoneData(e)}
             style={[styles.inputBox, {marginBottom:10}]}
             value={loginPhoneData}
             inputMode='tel'
             
           />
           <TouchableOpacity  style={{justifyContent:'center',alignItems:'center', backgroundColor:'green', borderRadius:10,padding:10, }} onPress={() => signinWithMobileNumber()}>
               <Text>Send Code</Text>
             </TouchableOpacity>
         </View>
         
         <View style={styles.inputContainer}>
           <Text style={styles.inputLabel}>Verification Code</Text>
           <View style={styles.passwordContainer}>
             <TextInput
             autoComplete='one-time-code'
               style={styles.inputBox}
               onChangeText={(e)=>setCode(e)}
               value={code}
               inputMode='numeric'
             />
           </View>
         </View>
 
         <View style={styles.loginBox}>
           <TouchableOpacity onPress={confirmVerificationCode}>
             <Text style={{ color: 'white' }}>Login</Text>
           </TouchableOpacity>
         </View>
         </>
       }
        <Text style={{textAlign:'center', color:'black', marginVertical:10}}>Or</Text>
        {!changeTomobileAuth&&<View style={{justifyContent:'center', alignItems:'center', marginTop:5}}>
          <TouchableOpacity onPress={()=>setChangeTomobileAuth(true)}>
            <Text style={{ color: 'black' }}>SignIn With Mobile Number</Text>
          </TouchableOpacity>
        </View>}
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={onGoogleButtonPress} >
            <Image
              source={{ uri: 'https://freelogopng.com/images/all_img/1657952440google-logo-png-transparent.png' }}
              width={30}
              height={30}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onFacebookButtonPress} >
            <Image
              source={{ uri: 'https://static.vecteezy.com/system/resources/previews/018/930/476/original/facebook-logo-facebook-icon-transparent-free-png.png' }}
              width={50}
              height={50}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.signupBox}>
          <View>
            <Text style={styles.signuptext}>Create Account</Text>
          </View>
          <View style={styles.signupButton}>
            <TouchableOpacity >
              <Text style={{ color: 'blue' }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
