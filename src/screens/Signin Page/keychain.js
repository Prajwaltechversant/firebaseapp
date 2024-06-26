import AsyncStorage from '@react-native-async-storage/async-storage';


export const setKeyChain = async (loginData) => {

    const date = new Date()
    // console.log(date.getTime())
    const currT = date.getTime();
    const { username, password } = loginData;

    try {
        const jsonData = JSON.stringify(loginData);
    

    }
    catch (err) {
        console.log(err, "keychain")
    }
}

export const getUserCred = async()=>{
    const userCred = await AsyncStorage.getAllKeys()
    const user = await AsyncStorage.getItem(`${userCred[userCred.length-1]}`)
    const userdata = user != null ? JSON.parse(user) : null;
    // console.log(userdata,"ajajajaj")
    return  userdata;

}
