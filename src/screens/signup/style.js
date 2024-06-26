import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: "100%",
        justifyContent: 'center'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    logo: {
        borderRadius: 100
    },
    formContainer: {
        backgroundColor: '#b1b9c7',
        margin: 20,
        padding: 40,
        width: "80%",
        height: 'auto',
        borderRadius: 30
    },
    inputContainer: {
        marginVertical: 10

    },
    inputLabel: {
        color: "black",
        fontSize: 20,
        fontWeight: '400'
    },
    inputBox: {
        backgroundColor: 'yellow',
        borderRadius: 20,
        width: '100%',
        color:'black'
    },
    loginBox: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        height: 45,
        borderRadius: 20
    },
    signupBox: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    signuptext: {
        marginLeft: 5,
        color: 'black',
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },
    signupButton: {
        marginLeft: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        width: '95%',
        // justifyContent:'space-evenly',
        alignItems: 'center',
        // paddingHorizontal:10

    },
    icon: {
        backgroundColor: 'yellow',
        fontSize: 35,
        borderRadius: 30,
        marginLeft: 2
    }

})

export default styles;