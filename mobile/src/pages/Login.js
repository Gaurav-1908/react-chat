import React from 'react';
import {Text, 
        View, 
        StyleSheet, 
        SafeAreaView,
        TextInput,
        Button,
        Pressable} from 'react-native';

import { Heading } from '../components/Heading';

export const Login = ({setLoggedIn,setUserName,setUserList,setMessages,client}) =>{
    const [username, setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [mode, setMode] = React.useState(1);
    const [error, setError] = React.useState('')

    client.onmessage = (message) =>{
        const dataFromServer = JSON.parse(message.data);
        console.log("in login");
        // console.log(dataFromServer)
        if(dataFromServer.error){
            console.log(dataFromServer.error)
            setError(dataFromServer.error);
            setUsername("")
            setPassword("")
        }
        else if(dataFromServer.message){
            
            const tempMessages = dataFromServer.messages;
            setMessages(tempMessages);      
        }
        else{
            const tempUserList = dataFromServer.userList;
            setUserList(tempUserList);
            setUserName(dataFromServer.userName);
        }
        
    }

    function submit(){
        client.send(JSON.stringify({
            type: mode ? 'login' : 'register',
            userName:username,
            password:password

        }));
    }

    function changeMode(){
        setMode(!mode);
    }
    return(
        <View style={styles.login}>
            <Heading/>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder='username'
                placeholderTextColor="#000" 
            
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="password"
                placeholderTextColor="#000" 
                secureTextEntry={true}
            />
           
            
            {mode ? (
                <View>
                    <Pressable style={styles.button} onPress={() => submit()}>
                        <Text style={styles.text}>Login</Text>
                    </Pressable>
                    <Text style={styles.error}>{error}</Text>
                    <View style={styles.registerLine}>
                        <Text>Don't Have a Account</Text>
                        <Pressable onPress={() => changeMode()}>
                            <Text style={styles.register} onPress={() => changeMode()}>Register</Text>
                        </Pressable>    
                    </View>
                </View>
                
                ) : 
                <View>
                    <Pressable style={styles.button} onPress={() => submit()}>
                        <Text style={styles.text}>Register</Text>
                    </Pressable>
                    <Text style={styles.error}>{error}</Text>
                    <View style={styles.registerLine}>
                        <Text>Already have a Account</Text>
                        <Pressable onPress={() => changeMode()}>
                            <Text style={styles.register} onPress={() => changeMode()}>Login</Text>
                        </Pressable>    
                    </View>
                </View>
                }
            
        </View>
    )
}

const styles = StyleSheet.create({
    login: {
        margin: '5%',
        paddingTop: '20%',
        marginTop: '30%',
        height:'80%',
        padding: '2%',
        backgroundColor: "#202c33"
    },
    input: {
      height: 40,
      margin: '4%',
      borderWidth: 1,
      padding: '2%',
      backgroundColor: 'white',
      color: 'black'
    },
    button: {
        height: 40,
        alignItems: 'center',
        margin: '4%',
        marginBottom: '1%',
        backgroundColor: 'blue',
        justifyContent: 'center',
        color: 'white'
    },
    registerLine: {
        flexDirection: 'row',
        marginLeft: '4%'
    },
    register: {
        color: 'blue',
        marginLeft: 10
    },
    error: {
        color: 'red',
        paddingLeft: '4%' 
    }
  });