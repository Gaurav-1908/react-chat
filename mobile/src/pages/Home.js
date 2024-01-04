import React from 'react';
import {Text, View, StyleSheet, RefreshControlBase} from 'react-native';
import { Header } from '../components/Header.js';
import { Findusers } from '../components/Findusers.js';
import { Userlist } from '../components/Userlist.js';
import { Messages } from '../components/Messages.js';

export const Home = ({userName,userList,receiver,setReceiver,messages,setMessages,setUserList,client}) =>{
    return(
        <View style={styles.home}>
           
           { receiver ?
                <Messages
                    sender={userName}
                    receiver={receiver}
                    setReceiver={setReceiver}
                    messages={messages}
                    setMessages={setMessages}
                    setUserList={setUserList}
                    client={client}
                />
            :
            <View>
                <Header 
                    userName={userName}
                />
                <Findusers
                    setUserList={setUserList}
                    client={client}
                />
                <Userlist
                    userList={userList}
                    setUserList={setUserList}
                    setReceiver={setReceiver}
                    setMessages={setMessages}
                    userName={userName}
                    client={client}
                />
            </View>
            
           }
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        backgroundColor: "#111b21",
        height:'100%',
        padding: '2%'
    }
})