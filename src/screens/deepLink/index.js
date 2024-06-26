import { View, Text, Touchable, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
export default function LinkingSample() {

    return (
        <View style={{ flex: 3, alignItems: 'center' }}>
            <Text style={styles.text}>Deep Link</Text>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity>
                    <Text style={styles.text}>Reset Password</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', gap: 10 }}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/prjwlvk')} >
                    <Text style={styles.text}>Instagram</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=919846096699&text=Hi%20there!')}>
                    <Text style={styles.text}>Whatsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('myapp://videos')}>
                    <Text style={styles.text}>open videos</Text>
                </TouchableOpacity>

            </View>
            <TouchableOpacity style={{ borderRadius: 5, backgroundColor: 'gray', height: 30, width: 200, margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => Linking.openURL('myapp://videos')}>
                <Text style={{ color: 'white' }}>Go to Screen1 via url</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 20
    }
})