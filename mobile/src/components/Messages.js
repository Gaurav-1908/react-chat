import React from 'react';
import {Text, View, StyleSheet, RefreshControlBase, ScrollView, Keyboard,Pressable} from 'react-native';
import { Sendmessage } from './Sendmessage';

export const Messages = ({sender,receiver,setReceiver,messages,setMessages,setUserList,client}) =>{
    function goBack(){
        client.send(JSON.stringify({
            type: 'getUsers',
            userName:sender,

        }));
        setReceiver('')
        setMessages([])
    }
    client.onmessage = (messages) =>{
        const dataFromServer = JSON.parse(messages.data);
        console.log("In messages");
        const tempMessages = dataFromServer
        setMessages(tempMessages);
        
        
    }

    const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setIsKeyboardOpen(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setIsKeyboardOpen(false);
        });

        // Cleanup event listeners
        return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
        };
    }, []);

    const height = isKeyboardOpen ? '76%' : '85%';

    return(
        <View >
            <Pressable onPress={() => goBack()}>
                <Text style={styles.text}>
                    &#8592;
                </Text>
            </Pressable>
            <View style={styles.messages}>
            <Text style={styles.header}>
                {receiver}
            </Text>
            
                <ScrollView style={{height: height,}}
                     ref={ref => {this.scrollView = ref}}
                     onContentSizeChange={() => this.scrollView.scrollToEnd({animated: false})}
                    
                    >
                        
                    {messages.map(message =>
                            message.sender === receiver ?
                            (
                            <Text key={message._id}
                            style={styles.receiver}>
                                {message.message}
                            </Text>
                            )
                            :
                            (
                            <Text key={message._id}
                            style={styles.sender}>
                                {message.message}
                            </Text>
                            )
                        
                        
                    )}
                </ScrollView>
                <Sendmessage
                    sender={sender}
                    receiver={receiver}
                    setMessages={setMessages}
                    setUserList={setUserList}
                    client={client}
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingBottom: '6%',
        fontSize: 20,
    },
    messages: {
        // flex: 1,
        padding: '3%',
    },
    sender: {
        textAlign: 'right',
        backgroundColor:"#005c4b",
        margin:'1%',
        padding: '2%',
        marginLeft: '10%'
    },
    receiver: {
        backgroundColor:"#202c33",
        margin: '1%',
        padding: '2%',
        marginRight: '10%'
    },
    text: {
        fontSize: 30
    }

})