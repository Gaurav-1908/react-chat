import React from 'react';
import {Text, View, StyleSheet, RefreshControlBase} from 'react-native';
import { Login } from './src/pages/Login';
import { Home } from './src/pages/Home';
// import  {WebSocket}  from 'react-native';
var client = new WebSocket('ws://144.24.102.198:8000');
// var client = new WebSocket('ws://localhost:8000');



const App = () =>{
  const [userName,setUserName] = React.useState("");
  const [userList,setUserList] = React.useState([]);
  const [receiver,setReceiver] = React.useState("");
  const [messages,setMessages] = React.useState([]);
   
    client.onopen = () => {
        console.log('WebSocket Client Connected to',client.url);   
    }

    client.onerror = e =>{
      console.log('error is', e);
    }

    client.onclose = () =>{
      console.log('Websocket Closed')
    }
    
    
    
    // setUserName('')
    // console.log("username",userName);
    return(
        <View style={styles.app}>
            
            {userName ? 
                <Home
                userName = {userName} 
                userList= {userList}
                receiver = {receiver}
                setReceiver = {setReceiver}
                messages = {messages}
                setMessages = {setMessages}
                setUserList = {setUserList}
                client = {client}
                />
              :
              <Login
                setUserName= {setUserName}
                setUserList = {setUserList}
                setMessages = {setMessages}
                client={client}
                />
              }
              
        </View>
    )
    
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#111b21",
    height: '100%'
  }
})
export default App;