import React from 'react';
import {Text, 
    View, 
    StyleSheet, 
    SafeAreaView,
    TextInput,
    Button,
    Pressable} from 'react-native';

export const Sendmessage = ({sender,receiver,setMessages,setUserList,client}) =>{
    const [currentMessage,setCurrentMEssage] = React.useState("")
    function sendMessage(){
        client.send(JSON.stringify({
            type:"send Message",
            message:currentMessage,
            sender:sender,
            receiver:receiver
          }));
          setCurrentMEssage("");
    }

    client.onmessage = (messages) =>{
        const dataFromServer = JSON.parse(messages.data);
        console.log('in send message');
        if(dataFromServer.userList){
            // console.log('here1');
            const tempMessages = dataFromServer.messages
            setMessages(tempMessages);

            const tempUserList = dataFromServer.userList;
            setUserList(tempUserList);
        }
        else{
            const tempMessages = dataFromServer
            setMessages(tempMessages);
        }
          
    }

    return(
        <View style={styles.Sendmessage}>
            
                <TextInput
                    style={styles.input}
                    onChangeText={setCurrentMEssage}
                    value={currentMessage}
                    placeholder='Type Message'
                    placeholderTextColor="#000" 
                />
    
    
                <Pressable style={styles.send} onPress={() => sendMessage()}>
                        <Text>
                            Send
                        </Text>
                </Pressable>
            
        </View>
    )
}

const styles = StyleSheet.create({
    Sendmessage: {
        flex: 1,
        flexDirection: 'row',
        margin:12,
        marginLeft:'0%',
        marginEnd: '0%'
    },
    input: {
        flex: 5,
        backgroundColor: 'white',
        height: 40,
        borderWidth: 1,
        padding: 10,
        // marginEnd: 12,
        color: 'black'
      },
    send: {
        flex: 1,
        height: 39,
        backgroundColor: 'blue',
        width: '20%',
        alignItems: 'center',
        paddingTop: 10,
    }
})