import React from 'react';
import {Text, View, StyleSheet, RefreshControlBase,Pressable} from 'react-native';

export const Userlist = ({userList,setUserList,setReceiver,setMessages,userName,client}) =>{
    function getMessages(Receiver){
        setReceiver(Receiver);
        client.send(JSON.stringify({
            type:"message",
            sender: userName,
            receiver: Receiver
          }));
        // console.log('receiver is ', Receiver);
    }
    client.onmessage = (messages) =>{
        const dataFromServer = JSON.parse(messages.data);
        console.log("In user list",dataFromServer);
        if(dataFromServer.userList){
            const tempUserList = dataFromServer.userList;
            setUserList(tempUserList);
        }
        else{
            const tempMessages = dataFromServer
            setMessages(tempMessages);
        }
       
    }
    return(
        <View style={styles.userList}>
            {userList.map((Receiver, index) => (
                <View key={index}>
                    <Pressable  style={styles.user} onPress={() => getMessages(Receiver)}>
                        <Text style={styles.text}>
                            {Receiver}
                        </Text>
                    </Pressable>
                </View>
            )

            )}
        
        </View>
    )
}

const styles = StyleSheet.create({

    userList: {
        padding: '6%',
        paddingTop: '3%',
        backgroundColor:"#111b21",
        // borderStyle: 'solid',
        // borderBottomWidth: 2,
        // borderBottomColor:'black'
    },
    user: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: '4%',
        paddingLeft: '0%',
        // fontSize: 
    },
    text: {
        fontSize: 15
    }
})